import { BRAND } from '@/data/brand'
import { getCareerRoleById, resolveCareerRoleId } from '@/data/careers'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { Suspense } from 'react'
import { CareersApplyPage } from '@/views/CareersApplyPage'

type Props = { searchParams: Promise<{ role?: string }> }

export async function generateMetadata({ searchParams }: Props) {
  const { role: roleParam } = await searchParams
  const roleId = resolveCareerRoleId(roleParam ?? null)
  const role = getCareerRoleById(roleId)
  const base = PAGE_SEO.careersApply
  const title = role?.title ? `Apply — ${role.title} | ${BRAND.name}` : base.title
  return buildPageMetadata({
    ...base,
    title,
    shareTitle: role?.title ? `Apply — ${role.title} | ${BRAND.name}` : base.shareTitle ?? base.title,
  })
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CareersApplyPage />
    </Suspense>
  )
}
