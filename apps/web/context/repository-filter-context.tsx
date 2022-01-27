import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  ForkStatusType,
  GetLanguagesQuery,
  RepoOrder,
  TemplateStatusType,
} from '../lib/graphql-types';

export const repoOrderOptions: Record<
  string,
  { name: string; value: RepoOrder }
> = {
  TRENDING_WEEKLY: { name: 'رشد در مدت اخیر', value: RepoOrder.TrendingWeekly },
  STARS_DESC: { name: 'بیشترین تعداد ستاره', value: RepoOrder.StarsDesc },
  CREATED_DESC: { name: 'جدید‌ترین', value: RepoOrder.CreatedDesc },
  PUSHED_DESC: { name: 'جدید‌ترین به‌روزرسانی', value: RepoOrder.PushedDesc },
};

export const forkStatusOptions: Record<
  ForkStatusType,
  { name: string; value: ForkStatusType }
> = {
  ALL: { name: 'همه', value: ForkStatusType.All },
  FORK: { name: 'فورک', value: ForkStatusType.Fork },
  SOURCE: { name: 'سورس', value: ForkStatusType.Source },
};

export const templateStatusOptions: Record<
  TemplateStatusType,
  { name: string; value: TemplateStatusType }
> = {
  ALL: { name: 'همه', value: TemplateStatusType.All },
  NOT_TEMPLATE: { name: 'غیر قالب', value: TemplateStatusType.NotTemplate },
  TEMPLATE: { name: 'قالب', value: TemplateStatusType.Template },
};

export type TRepositoryFiltersState = {
  searchTerm: string | null;
  languages: GetLanguagesQuery['languages']['edges'][0]['node'][] | null;
  order: { name: string; value: RepoOrder } | null;
  forkStatus: { name: string; value: ForkStatusType };
  templateStatus: { name: string; value: TemplateStatusType };
};

export const initialFilters: TRepositoryFiltersState = {
  searchTerm: '',
  languages: [],
  order: repoOrderOptions['TRENDING_WEEKLY'],
  forkStatus: forkStatusOptions['ALL'],
  templateStatus: templateStatusOptions['ALL'],
};

interface RepositoryFilterContext {
  filters: TRepositoryFiltersState;
  setFilters?: Dispatch<SetStateAction<TRepositoryFiltersState>>;
}

const RepositoryFilterContext = createContext<RepositoryFilterContext>({
  filters: initialFilters,
});

export const RepositoryFilterContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] =
    useState<TRepositoryFiltersState>(initialFilters);
  return (
    <RepositoryFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </RepositoryFilterContext.Provider>
  );
};

export const useRepositoryFilterContext = () => {
  return useContext(RepositoryFilterContext);
};

export default RepositoryFilterContext;
