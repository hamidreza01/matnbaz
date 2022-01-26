import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useMemo } from 'react';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { UserPreview } from '../../../components/User/UserPreview';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetPostDocument,
  GetPostQueryResult,
  GetPostQueryVariables,
  useGetPostQuery,
} from '../../../lib/graphql-types';

export interface PostPageProps {
  postSlug: string;
}

const PostPage: NextPage<PostPageProps> = ({ postSlug }) => {
  const { data } = useGetPostQuery({
    variables: { slug: postSlug },
  });

  const post = useMemo(() => data.postBySlug, [data]);

  return (
    <MainLayout withFooterPromo>
      <div className="max-w-3xl mx-auto ">
        <Image
          width={1280}
          height={640}
          src={post.image}
          className="w-full rounded-lg"
          alt={`عکس پست "${post.title}"`}
        />
        <h1 className="mt-6 text-center text-5xl font-extrabold">
          {post.title}
        </h1>
        <div
          className="mt-10 prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <UserPreview
          padded
          colored
          border="none"
          user={post.author}
          className="mt-4"
        />
      </div>
    </MainLayout>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  query: { slug: postSlug },
}) => {
  if (typeof postSlug !== 'string')
    return {
      notFound: true,
    };

  const apolloClient = initializeApollo();

  const {
    data: { postBySlug },
  } = await apolloClient.query<
    GetPostQueryResult['data'],
    GetPostQueryVariables
  >({
    query: GetPostDocument,
    variables: {
      slug: postSlug,
    },
  });

  if (!postBySlug)
    return {
      notFound: true,
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      postSlug,
    },
  };
};
