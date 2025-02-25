import { links, persianNumbers } from '@matnbaz/common';
import classNames from 'classnames';
import { NextPage } from 'next';
import { LogoJsonLd, NextSeo, SocialProfileJsonLd } from 'next-seo';
import { CSSProperties, useEffect, useState } from 'react';
import { GoPencil, GoRepo } from 'react-icons/go';
import {
  HiBookOpen,
  HiChevronDown,
  HiCollection,
  HiLightningBolt,
  HiMap,
  HiQuestionMarkCircle,
  HiSearch,
  HiSparkles,
  HiStar,
  HiStatusOnline,
  HiUsers,
} from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { SiDiscord } from 'react-icons/si';
import { IranVector } from '../components/Illustration/IranVector';
import { MainLayout } from '../components/Layout/MainLayout';
import { Button } from '../components/UI/Button/Button';
import { Card } from '../components/UI/Card';
import { useMetadataQuery } from '../lib/graphql-types';

const HomePage: NextPage = () => {
  const { data: metadata } = useMetadataQuery();
  const [githubStargazersCount, setGithubStargazersCount] = useState<
    number | null
  >(null);
  const [discordPresenceCount, setDiscordPresenceCount] = useState<
    number | null
  >(null);

  useEffect(() => {
    const updateStargazersCount = async () => {
      const response = await fetch(
        'https://api.github.com/repos/matnbaz/matnbaz'
      );
      const json = await response.json();
      setGithubStargazersCount(json.stargazers_count);
    };

    const updateDiscordOnlineCount = async () => {
      const response = await fetch(
        'https://discord.com/api/guilds/912032955956871188/widget.json'
      );
      const json = await response.json();
      setDiscordPresenceCount(json.presence_count);
    };

    updateStargazersCount();
    updateDiscordOnlineCount();
  }, []);

  return (
    <MainLayout withoutPadding maxWidth={false}>
      <NextSeo
        title="جامعه اُپِن‌سورس ایرانی"
        titleTemplate="متن‌باز – %s"
        description="متن‌باز با هدف جمع‌آوری و معرفی پروژه‌ها و توسعه‌دهندگان ایرانی، ترویج فرهنگ اپن‌سورس، متصل کردن توسعه‌دهندگان ایرانی و ارائه راهکار‌های حمایتی برای توسعه‌دهندگان اپن‌سورس حرفه‌ای ساخته شده‌است."
      />

      <SocialProfileJsonLd
        type="Organization"
        name="متن‌باز"
        url="http://matnbaz.net"
        sameAs={[
          'http://twitter.com/matnbaz_net',
          'http://instagram.com/matnbaz_net',
          'http://t.me/matnbaz_net',
        ]}
      />

      <LogoJsonLd
        logo="https://github.com/matnbaz/visual/blob/main/readme-logo.png"
        url="https://matnbaz.net"
      />

      <div className="overflow-hidden mb-12 sm:mb-24">
        <div className="h-screen md:min-h-[40rem] flex flex-col items-center max-w-8xl mx-auto">
          <div className="m-auto px-4 sm:px-6 sm:text-center lg:text-right flex items-center">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="">
                <div className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-5xl lg:mt-6 xl:text-5xl">
                  <h1 className="inline">
                    <span className="text-transparent bg-clip-text ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-400 to-primary-500">
                      متن‌باز
                    </span>
                  </h1>
                  :{' '}
                  <h2 className="inline">
                    جامعه اُپِن‌سورس{' '}
                    <span className="text-transparent bg-clip-text ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-green-400 to-red-600">
                      ایرانی
                    </span>
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  متن‌باز با هدف جمع‌آوری و معرفی پروژه‌ها و توسعه‌دهندگان
                  ایرانی، ترویج فرهنگ اپن‌سورس، متصل کردن توسعه‌دهندگان ایرانی و
                  ارائه راهکار‌های حمایتی برای توسعه‌دهندگان اپن‌سورس حرفه‌ای
                  ساخته شده‌است.
                </p>
                <div className="mt-8 sm:mt-12">
                  <div className="mt-3 space-x-3 space-x-reverse">
                    <Button.Primary href="#more" size="lg">
                      اطلاعات بیش‌تر
                      <HiChevronDown className="w-5 h-5 mr-2" />
                    </Button.Primary>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <IranVector />
              </div>
            </div>
          </div>
          {/* <div className="max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div>
                    <h3 className="max-w-md text-2xl md:text-3xl font-extrabold text-center lg:max-w-xl">
                      اسپانسر‌های متن‌باز
                    </h3>
                    <a
                      className="mt-1 text-sm text-secondary text-center block"
                      href={sponsorshipUrl}
                    >
                      اطلاعات بیش‌تر
                    </a>
                  </div>
                  <div className="flow-root self-center mt-8 lg:mt-0">
                    <div className="-mt-4 -mr-8 flex flex-wrap justify-between lg:-mr-4">
                      <SponsorImage
                        name="Empty sponsor"
                        image="/sponsors/empty-light.png"
                        darkImage="/sponsors/empty-dark.png"
                        url={sponsorshipUrl}
                      />
                      <SponsorImage
                        name="Empty sponsor"
                        image="/sponsors/empty-light.png"
                        darkImage="/sponsors/empty-dark.png"
                        url={sponsorshipUrl}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
        </div>
        <div id="more">
          <div id="ease-discovery">
            <FeatureCategory
              title={
                <>
                  جمع‌آوری{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-400 to-primary-500">
                    پروژه‌های ایرانی
                  </span>
                </>
              }
              description={
                <>
                  متن‌باز سعی بر جمع‌آوری پروژه‌ها و توسعه‌دهندگان ایرانی دارد.
                  {metadata && (
                    <>
                      {' '}
                      در حال حاضر متن‌باز موفق به پیدا‌کردن{' '}
                      <span className="font-bold">
                        {persianNumbers(metadata.metadata.totalOwnersCount)}{' '}
                        سازنده
                      </span>{' '}
                      و{' '}
                      <span className="font-bold">
                        {persianNumbers(metadata.metadata.totalReposCount)} مخزن
                      </span>{' '}
                      در{' '}
                      <span className="font-bold">
                        {persianNumbers(metadata.metadata.totalTopicsCount)}{' '}
                        موضوع
                      </span>{' '}
                      شده است.
                    </>
                  )}
                </>
              }
              // با متن‌باز شما می‌توانید پروژه های اپن‌سورس (Open-Source) مختلف ایرانی را کشف کنید. اگر شما هم کار اپن‌سورس کرده‌اید، به احتمال زیاد اسم خود را در سایت پیدا خواهید کرد!
            />

            <div className="mt-12 lg:mt-28">
              <div className="m-auto max-w-7xl px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 sm:grid-flow-row-dense">
                  <div id="explorer" className="md:col-span-2 lg:col-span-1">
                    <Feature
                      centered
                      title="کاوش‌گر"
                      description="با استفاده از فیلتر‌های مختلف پکیج‌ها، کتابخانه‌ها و پروژه‌های اپن‌سورس ایرانی را کشف کنید."
                      href="/explore"
                      cta="مشاهده کاوش‌گر"
                      icon={HiSearch}
                      iconWrapperClassName="bg-gradient-to-bl from-green-500 to-emerald-400"
                    />
                  </div>
                  <div id="collections">
                    <Feature
                      centered
                      title="مجموعه‌ها"
                      description="مجموعه‌ها به شما کمک می‌کنند مخزن‌های اپن‌سورس مورد نظر را سریع‌تر و راحت‌تر پیدا کنید."
                      href="/collections"
                      cta="مشاهده مجموعه‌ها"
                      icon={HiCollection}
                      iconWrapperClassName="bg-gradient-to-bl from-red-500 to-rose-400"
                    />
                  </div>
                  <div id="selections">
                    <Feature
                      centered
                      title="پروژه‌های منتخب"
                      description="آخر هر هفته در متن‌باز پروژه‌هایی انتخاب شده و در سایت و شبکه‌های اجتماعی متن‌باز قرار می‌گیرند."
                      href="/blog/tags/معرفی_پروژه"
                      cta="مشاهده پروژه‌های منتخب"
                      icon={HiSparkles}
                      iconWrapperClassName="bg-gradient-to-bl from-pink-500 to-pink-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <NextSectionChevron id="promote-open-source" />
          </div>

          <div id="promote-open-source" className="mt-40 sm:mt-96">
            <FeatureCategory
              title={
                <>
                  ترویج{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-400 to-primary-500">
                    فرهنگ اپن‌سورس
                  </span>
                </>
              }
              description="متن‌باز قصد دارد با ترویج فرهنگ اپن‌سورس، توسعه‌دهندگان را به انجام پروژه‌های اپن‌سورس حرفه‌ای ترغیب کند."
            />
            <div className="mt-12 lg:mt-28">
              <div className="m-auto max-w-7xl mt-16 sm:mt-28 px-6 space-y-36">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 sm:grid-flow-row-dense">
                  <div id="education" className="md:col-span-2 lg:col-span-1">
                    <Feature
                      centered
                      title="مطالب آموزشی"
                      description="نویسندگان انجمن متن‌باز پست‌های آموزشی با موضوع اپن‌سورس منتشر می‌کنند."
                      iconWrapperClassName="bg-gradient-to-bl from-purple-500 to-purple-400"
                      icon={GoPencil}
                      cta="مشاهده بلاگ"
                      href={`/blog`}
                    />
                  </div>
                  <div id="events">
                    <Feature
                      centered
                      title="رویداد‌های برنامه‌نویسی"
                      description="دوست داریم در آینده رویداد‌هایی با محوریت برنامه‌نویسی و اپن‌سورس برگزار کنیم."
                      iconWrapperClassName="bg-gradient-to-bl from-cyan-500 to-cyan-400"
                      icon={HiLightningBolt}
                      disabled
                      cta="در آینده"
                    />
                  </div>
                  <div id="source-code">
                    <Feature
                      centered
                      title="سورس‌کد متن‌باز"
                      description="سورس‌کد بک‌اند، فرانت‌اند، اپلیکیشن موبایل و فایل‌های گرافیکی متن‌باز به صورت اپن‌سورس در دسترس عموم قرار دارند."
                      iconWrapperClassName="bg-gradient-to-bl from-yellow-500 to-orange-400"
                      icon={GoRepo}
                      cta="مشاهده سورس‌کد"
                      href={links.githubRepo}
                      badge={
                        githubStargazersCount !== null && (
                          <span className="flex justify-center items-center">
                            <HiStar className="ml-1 w-4 h-4" />
                            {persianNumbers(githubStargazersCount)}
                          </span>
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <NextSectionChevron id="developers-network" />
          </div>

          <div id="developers-network" className="mt-40 sm:mt-96">
            <FeatureCategory
              title={
                <>
                  متصل‌کردن{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-400 to-primary-500">
                    توسعه‌دهندگان
                  </span>
                </>
              }
              description="متن‌باز سعی در متصل کردن افراد فعال در فضای اپن‌سورس ایران را دارد."
            />
            <div className="mt-12 lg:mt-28">
              <div className="m-auto max-w-7xl mt-16 sm:mt-28 px-6">
                <div className="grid sm:grid-cols-2 gap-24 sm:grid-flow-row-dense">
                  <div id="discord-community">
                    <Feature
                      centered
                      title="انجمن دیسکورد متن‌باز"
                      description="در انجمن متن‌باز افراد می‌توانند با توسعه‌دهندگان دیگر آشنا شوند و شبکه خود را گسترش دهند."
                      iconWrapperClassName="bg-gradient-to-bl from-[#5865F2] to-[#7E88F5]"
                      icon={SiDiscord}
                      cta="ورود به سرور"
                      href={links.discord}
                      badge={
                        discordPresenceCount !== null && (
                          <span className="flex justify-center items-center">
                            <HiStatusOnline className="ml-1 w-4 h-4" />
                            {persianNumbers(discordPresenceCount)}
                          </span>
                        )
                      }
                    />
                  </div>
                  <div id="top-users">
                    <Feature
                      centered
                      title="کاربران برتر گیت‌هاب"
                      description="در این صفحه کاربران ایرانی گیت‌هاب بر اساس مشارکت‌های عمومی آن‌ها به مخزن‌های اپن‌سورس لیست شده‌اند."
                      iconWrapperClassName="bg-gradient-to-bl from-teal-500 to-teal-400"
                      icon={HiUsers}
                      cta="مشاهده کاربران"
                      href={`/github/top-users`}
                      badge="جدید"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <NextSectionChevron id="support" /> */}
          </div>

          {/* <div id="support" className="mt-20 sm:mt-40">
            <div className="bg-gradient-to-bl from-red-600 to-rose-600">
              <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  به متن‌باز کمک کنید!
                </h2>
                <p className="mt-4 text-lg leading-6 text-red-200">
                  متن‌باز برای ادامه پیدا‌کردن به کمک نیاز دارد.
                </p>
                <div className="mt-8 flex items-center justify-center flex-wrap gap-4">
                  <Link href="/support#organizations">
                    <a className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 sm:w-auto">
                      <HiHeart className="w-5 h-5 ml-2" />
                      برای شرکت‌ها
                    </a>
                  </Link>
                  <Link href="/support#personal">
                    <a className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 sm:w-auto">
                      <HiHeart className="w-5 h-5 ml-2" />
                      برای اشخاص
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}

          <div
            id="links"
            className="mt-40 sm:mt-96"
            // className="mt-20 sm:mt-40"
          >
            <div className="m-auto max-w-7xl px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 sm:grid-flow-row-dense">
                <div id="roadmap" className="md:col-span-2 lg:col-span-1">
                  <Feature
                    centered
                    title="نقشه‌راه"
                    description="برنامه متن‌باز برای قابلیت‌ها‌ی آینده و مواردی که بر روی آن‌ها کار می‌کنیم را مشاهده کنید."
                    href={links.githubRoadmap}
                    cta="مشاهده نقشه‌راه"
                    external
                    icon={HiMap}
                    iconWrapperClassName="bg-gradient-to-bl from-green-500 to-green-400"
                  />
                </div>

                <div id="faq">
                  <Feature
                    centered
                    title="پرسش‌های متداول"
                    description="در این صفحه پرسش‌هایی که به‌صورت متداول از ما پرسیده شده را مشاهده می‌کنید."
                    href="/faq"
                    cta="مشاهده پرسش‌ها"
                    icon={HiQuestionMarkCircle}
                    iconWrapperClassName="bg-gradient-to-bl from-indigo-500 to-indigo-400"
                  />
                </div>

                <div id="guide">
                  <Feature
                    centered
                    title="راهنماهای متن‌باز"
                    description="اگر قصد شروع یک پروژه اپن‌سورس را دارید، این راهنما‌ها شروع خیلی خوبی برای شما هستند."
                    href="https://opensource.guide/fa/"
                    cta="مشاهده راهنما‌ها"
                    external
                    icon={HiBookOpen}
                    iconWrapperClassName="bg-gradient-to-bl from-amber-500 to-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;

interface CollectionItemProps {
  name?: string;
  imageSrc: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}
const CollectionItem = ({
  name,
  imageSrc,
  color,
  className,
  style,
}: CollectionItemProps) => {
  return (
    <div
      style={{ ...style }}
      className={classNames(
        className,
        'flex-shrink-0 rounded-lg border-gray-200 dark:border-gray-700 block disabled:pointer-events-none'
      )}
    >
      <div className="h-full px-2.5 py-3 sm:px-5 sm:py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={name}
          src={imageSrc}
          width={128}
          height={128}
          className="brightness-0 dark:invert mx-auto w-10 h-10 sm:w-14 sm:h-14"
        />
        {/* <div className="text-center text-sm sm:text-lg sm:font-bold mt-4">
          <span dir="ltr">{name}</span>{' '}
        </div> */}
      </div>
    </div>
  );
};

interface FeatureProps {
  iconWrapperClassName?: string;
  icon?: IconType;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
  centered?: boolean;
  disabled?: boolean;
  badge?: string | JSX.Element;
  external?: boolean;
}

const Feature = ({
  title,
  description,
  cta,
  href,
  iconWrapperClassName,
  icon: Icon,
  centered,
  disabled,
  badge,
  external,
}: FeatureProps) => {
  return (
    <div className={classNames('relative max-w-lg', centered && 'mx-auto')}>
      <div className={classNames('relative w-min', centered && 'mx-auto')}>
        {badge && (
          <span className="absolute -right-4 -top-4 inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-red-500 text-red-100">
            {badge}
          </span>
        )}
        <div className={classNames('p-4 rounded-xl', iconWrapperClassName)}>
          <Icon className="text-white w-10 h-10" />
        </div>
      </div>

      <h3
        className={classNames(
          'mt-5 text-2xl tracking-tight font-extrabold sm:text-3xl',
          centered && 'text-center'
        )}
      >
        {title}
      </h3>

      <p
        className={classNames(
          ' text-secondary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl',
          centered && 'text-center'
        )}
      >
        {description}
      </p>
      {cta && (
        <div className={classNames('flex mt-8', centered && 'justify-center')}>
          <Button.Primary
            target={external ? '_blank' : undefined}
            disabled={disabled}
            href={href}
            size="lg"
          >
            {cta}
          </Button.Primary>
        </div>
      )}
    </div>
  );
};

interface FeatureCategoryProps {
  title: string | JSX.Element;
  description?: string | JSX.Element;
}

const FeatureCategory = ({ title, description }: FeatureCategoryProps) => {
  return (
    <div className="text-center px-4 sm:px-0">
      <h2 className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
        {title}
      </h2>
      <p className="max-w-xl mt-5 mx-auto text-xl text-secondary">
        {description}
      </p>
    </div>
  );
};

interface LinkCardProps {
  title: string;
  href: string;
  icon: IconType;
  iconWrapperClassName?: string;
}

const LinkCard = ({
  title,
  href,
  icon: Icon,
  iconWrapperClassName,
}: LinkCardProps) => {
  return (
    <Card bgColor="standout" border="none" href={href}>
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className={classNames('p-3 rounded-r-lg', iconWrapperClassName)}>
          <Icon className="text-white w-5 h-5" />
        </div>

        <h3 className={classNames('')}>{title}</h3>
      </div>
    </Card>
  );
};

interface NextSectionChevronProps {
  id: string;
}

const NextSectionChevron = ({ id }: NextSectionChevronProps) => {
  return (
    <a href={`#${id}`} className="mt-12 lg:mt-28 mx-auto block w-min">
      <HiChevronDown className="w-12 h-12" />
    </a>
  );
};

//  <div className="mx-auto w-[1px] h-24 bg-gradient-to-b from-transparent to-green-400" />
//  <div className="flex items-center justify-center">
//  <div className="bg-gradient-to-b from-green-400 to-green-500 rounded-full p-2">
//    <HiUserGroup className="text-white w-4 h-4" />
//  </div>
// </div>
// <h1 className="mt-2 text-center text-2xl font-light bg-gradient-to-bl from-green-400 to-green-500 text-transparent bg-clip-text">
//  انجمن توسعه‌دهندگان
// </h1>

// <span className="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-600 dark:text-primary-100">جدید</span>
