import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

function Category({ selected }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className='group'
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#DC2626] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ed6e6e]',
          { 'dark:!fill-[#DC2626] fill-[#DC2626] ': selected }
        )}
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#DC2626] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ed6e6e]',
          { 'dark:!fill-[#DC2626] fill-[#DC2626] ': selected }
        )}
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#DC2626] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ed6e6e]',
          { 'dark:!fill-[#DC2626] fill-[#DC2626] ': selected }
        )}
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#C0BFC4] ',
          { 'dark:!fill-[#C0BFC4] fill-[#DC2626] ': selected }
        )}
      />
    </svg>
  )
}

export default Category
