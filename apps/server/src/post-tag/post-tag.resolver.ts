import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PostConnection } from '../models/connections/post.connections';
import { PostTag } from '../models/post-tag.model';
import { paginationComplexity } from '../plugins/pagination-complexity';

@Resolver(() => PostTag)
export class PostTagResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => PostTag, { nullable: true })
  tag(@Args('name') name: string) {
    return this.prisma.postTag.findFirst({
      where: { name: { mode: 'insensitive', equals: name } },
    });
  }

  @ResolveField(() => PostConnection, {
    complexity: paginationComplexity,
  })
  posts(@Args() pagination: PaginationArgs, @Parent() tag: P.PostTag) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.postTag
          .findUnique({
            where: { id: tag.id },
          })
          .Posts({ where: { publishedAt: { not: null } }, ...args }),
      async () =>
        (
          await this.prisma.postTag
            .findUnique({
              where: { id: tag.id },
              select: { id: true },
            })
            .Posts({ where: { publishedAt: { not: null } } })
        ).length,
      pagination
    );
  }
}
