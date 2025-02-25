import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';
import { GithubExtractorService } from './github-extractor.service';

@Processor(GITHUB_QUEUE)
export class GithubExtractorProcessor {
  constructor(private readonly extractorService: GithubExtractorService) {}
  private logger = new Logger(GithubExtractorProcessor.name);

  @Process(GITHUB_PROCESSES.EXTRACT)
  async extractProcess(job: Job<{ forceAll: boolean }>) {
    this.logger.log('Starting the extraction of repositories...');

    await this.extractorService.fullExtract(job.data.forceAll || false);
  }
}
