'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { FormSelectField } from '@/components/careers/FormSelectField'
import {
  inquiryInputClass,
  inquiryLabelClass,
  InquiryRequired,
} from '@/components/inquiry/inquiryFormShared'
import {
  buildClassificationPayload,
  buildLevelConfigs,
  findCategory,
  getCategoryRoots,
  getOtherFieldCopy,
  isClassificationComplete,
  isOtherSelection,
  resolveLevelSelection,
  type ProjectClassificationPayload,
} from '@/lib/studentProjectCategoryUtils'

interface StudentProjectCategoryFieldsProps {
  onPayloadChange: (payload: ProjectClassificationPayload | null) => void
  onValidityChange: (valid: boolean) => void
}

export function StudentProjectCategoryFields({
  onPayloadChange,
  onValidityChange,
}: StudentProjectCategoryFieldsProps) {
  const categories = useMemo(() => getCategoryRoots(), [])
  const [categoryValue, setCategoryValue] = useState(categories[0]?.value ?? '')
  const [pathValues, setPathValues] = useState<string[]>([])
  const [customOtherByDepth, setCustomOtherByDepth] = useState<Record<number, string>>({})

  const category = findCategory(categoryValue)

  const levelConfigs = useMemo(() => {
    if (!category) return []
    return buildLevelConfigs(category, pathValues)
  }, [category, pathValues])

  const selections = useMemo(
    () =>
      levelConfigs
        .map((config, index) =>
          resolveLevelSelection(config, pathValues[index] ?? '', customOtherByDepth),
        )
        .filter((item): item is { fieldLabel: string; value: string; label: string } => item !== null),
    [customOtherByDepth, levelConfigs, pathValues],
  )

  const payload = useMemo(
    () => (selections.length ? buildClassificationPayload(categoryValue, selections) : null),
    [categoryValue, selections],
  )

  const complete = useMemo(
    () => isClassificationComplete(categoryValue, pathValues, customOtherByDepth),
    [categoryValue, customOtherByDepth, pathValues],
  )

  useEffect(() => {
    if (!category) {
      onPayloadChange(null)
      onValidityChange(false)
      return
    }

    onValidityChange(complete)
    onPayloadChange(complete ? payload : null)
  }, [category, complete, onPayloadChange, onValidityChange, payload])

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value)
    setPathValues([])
    setCustomOtherByDepth({})
  }

  const handleLevelChange = (depth: number, value: string) => {
    setPathValues((current) => {
      const next = current.slice(0, depth)
      next[depth] = value
      return next
    })

    setCustomOtherByDepth((current) => {
      const next: Record<number, string> = {}
      for (const [key, text] of Object.entries(current)) {
        if (Number(key) < depth) {
          next[Number(key)] = text
        }
      }
      if (!isOtherSelection(value)) {
        delete next[depth]
      }
      return next
    })
  }

  const handleCustomOtherChange = (depth: number, value: string) => {
    setCustomOtherByDepth((current) => ({
      ...current,
      [depth]: value,
    }))
  }

  return (
    <fieldset className="rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5">
      <legend className="px-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        Project classification <InquiryRequired />
      </legend>
      <p className="mb-4 mt-1 px-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        Choose your category, program, branch or specialization, and project domain. Select{' '}
        <span className="font-medium text-zinc-600 dark:text-zinc-300">Other (please specify)</span>{' '}
        on any step if your option is not listed.
      </p>

      <div className="flex flex-col gap-5">
        <FormSelectField
          id="student-project-category"
          name="projectCategory"
          required
          value={categoryValue}
          onChange={(event) => handleCategoryChange(event.target.value)}
          label={
            <>
              Category <InquiryRequired />
            </>
          }
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </FormSelectField>

        {levelConfigs.map((config, index) => {
          const selectedValue = pathValues[index] ?? ''
          const showCustomField = isOtherSelection(selectedValue)
          const otherCopy = getOtherFieldCopy(config.fieldLabel)

          return (
            <Fragment key={`${categoryValue}-${config.depth}-${config.fieldLabel}`}>
              <FormSelectField
                id={`student-project-level-${config.depth}`}
                name={`projectLevel${config.depth}`}
                required
                value={selectedValue}
                onChange={(event) => handleLevelChange(config.depth, event.target.value)}
                label={
                  <>
                    {config.fieldLabel} <InquiryRequired />
                  </>
                }
              >
                <option value="" disabled>
                  Select {config.fieldLabel.toLowerCase()}
                </option>
                {config.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelectField>

              {showCustomField ? (
                <div className="careers-form-field w-full min-w-0 -mt-1">
                  <label htmlFor={`student-custom-other-${config.depth}`} className={inquiryLabelClass}>
                    {otherCopy.inputLabel} <InquiryRequired />
                  </label>
                  <input
                    id={`student-custom-other-${config.depth}`}
                    name={otherCopy.inputName}
                    required
                    value={customOtherByDepth[config.depth] ?? ''}
                    onChange={(event) => handleCustomOtherChange(config.depth, event.target.value)}
                    className={inquiryInputClass}
                    placeholder={otherCopy.placeholder}
                  />
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {otherCopy.helperText}
                  </p>
                </div>
              ) : null}
            </Fragment>
          )
        })}
      </div>

      {payload?.projectClassificationSummary ? (
        <>
          <input type="hidden" name="projectCategory" value={payload.projectCategory} />
          <input type="hidden" name="projectCategoryLabel" value={payload.projectCategoryLabel} />
          {payload.projectBranch ? (
            <>
              <input type="hidden" name="projectBranch" value={payload.projectBranch} />
              <input type="hidden" name="projectBranchLabel" value={payload.projectBranchLabel ?? ''} />
            </>
          ) : null}
          {payload.projectProgram ? (
            <>
              <input type="hidden" name="projectProgram" value={payload.projectProgram} />
              <input type="hidden" name="projectProgramLabel" value={payload.projectProgramLabel ?? ''} />
            </>
          ) : null}
          {payload.projectBranchSpecialization ? (
            <>
              <input type="hidden" name="projectBranchSpecialization" value={payload.projectBranchSpecialization} />
              <input
                type="hidden"
                name="projectBranchSpecializationLabel"
                value={payload.projectBranchSpecializationLabel ?? ''}
              />
            </>
          ) : null}
          {payload.projectDomain ? (
            <>
              <input type="hidden" name="projectDomain" value={payload.projectDomain} />
              <input type="hidden" name="projectDomainLabel" value={payload.projectDomainLabel ?? ''} />
            </>
          ) : null}
          {payload.projectTechnologyArea ? (
            <>
              <input type="hidden" name="projectTechnologyArea" value={payload.projectTechnologyArea} />
              <input
                type="hidden"
                name="projectTechnologyAreaLabel"
                value={payload.projectTechnologyAreaLabel ?? ''}
              />
            </>
          ) : null}
          <input
            type="hidden"
            name="projectClassificationSummary"
            value={payload.projectClassificationSummary}
          />
        </>
      ) : null}
    </fieldset>
  )
}
