import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t("PAGE_NOT_FOUND")}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
