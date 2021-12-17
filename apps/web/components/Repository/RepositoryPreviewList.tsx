import { useMemo } from 'react';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import InfiniteScroll from '../Feature/InfiniteScroll';
import RepositoryPreviewSkeletonLoader from '../Skeleton Loader/RepositoryPreviewSkeletonLoader';
import RepositoryPreview from './RepositoryPreview';

interface IRepositoryPreviewListPropsWithoutPagination {
  repositories: GetRepositoriesQuery['repositories']['edges'];
  loading?: never;
  networkStatus?: never;
  called?: never;
  onLoadMore?: never;
}

interface IRepositoryPreviewListPropsWithPagination {
  repositories: GetRepositoriesQuery['repositories']['edges'];
  onLoadMore?: () => void;
  loading: boolean;
  networkStatus?: number;
  called?: boolean;
}

const RepositoryPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  repositories,
  onLoadMore,
}:
  | IRepositoryPreviewListPropsWithPagination
  | IRepositoryPreviewListPropsWithoutPagination) => {
  const mappedRepositories = useMemo(() => {
    return repositories?.map((repository) => (
      <RepositoryPreview
        repository={repository.node}
        key={repository.node.id}
      />
    ));
  }, [repositories]);

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll
      onLoadMore={onLoadMore}
      dataLength={repositories?.length || 0}
    >
      {
        // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
        // In this case we don't want skeleton loaders to appear when the user is trying to load more data
        // So it checks if it's not 3 (fetchMore)
      }

      {(loading && networkStatus !== 3) || !called ? (
        <>
          {[...Array(6).keys()].map((number) => (
            <RepositoryPreviewSkeletonLoader key={number} />
          ))}
        </>
      ) : (
        mappedRepositories
      )}
      {networkStatus === 3 &&
        [...Array(2).keys()].map((number) => (
          <RepositoryPreviewSkeletonLoader key={number} />
        ))}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
