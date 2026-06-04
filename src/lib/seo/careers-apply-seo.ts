import { BRAND } from '@/data/brand'
import { getCareerRoleById, resolveCareerRoleId } from '@/data/careers'
import { PAGE_SEO } from '@/data/seo'
import type { PageSEO } from './seo-types'

export function buildCareersApplySeo(roleParam: string | null | undefined): PageSEO {
  const roleId = resolveCareerRoleId(roleParam ?? null)
  const role = getCareerRoleById(roleId)
  const base = PAGE_SEO.careersApply
  const title = role?.title ? `Apply — ${role.title} | ${BRAND.name}` : base.title
  const shareTitle = role?.title
    ? `Apply — ${role.title} | ${BRAND.name}`
    : base.shareTitle ?? base.title

  return {
    ...base,
    title,
    shareTitle,
  }
}
