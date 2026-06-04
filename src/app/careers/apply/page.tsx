import { PageSeo } from '@/components/seo/PageSeo'
import { buildCareersApplySeo } from '@/lib/careers-apply-seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { Suspense } from 'react'
import { CareersApplyPage } from '@/views/CareersApplyPage'

type Props = { searchParams: Promise<{ role?: string }> }

export async function generateMetadata({ searchParams }: Props) {
  const { role: roleParam } = await searchParams
  return buildPageMetadata(buildCareersApplySeo(roleParam))
}

export default async function Page({ searchParams }: Props) {
  const { role: roleParam } = await searchParams
  const seo = buildCareersApplySeo(roleParam)

  return (
    <>
      <PageSeo seo={seo} />
      <Suspense fallback={null}>
        <CareersApplyPage />
      </Suspense>
    </>
  )
}
