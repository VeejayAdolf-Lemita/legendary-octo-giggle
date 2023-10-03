import { useMemo } from 'react';
import Select from 'react-select';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import useTableStore from '../tableStore';
import customerData from '../assets/MOCK_DATA.json';
import { GrPowerCycle } from 'react-icons/gr';
import { BsPersonGear } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';

export default function Table() {
  const data = useMemo(() => customerData, []);
  const { sorting, filtering, selectFilter, setSorting, setFiltering, setSelectFilter } =
    useTableStore();

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: 'Customer Details',
      accessorKey: 'name',
      cell: (props) => (
        <div className='pl-3'>
          <div className='text-base font-semibold'>{props.getValue()?.name}</div>
          <div className='font-normal text-gray-500'>{props.getValue()?.website}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (props) => (
        <span
          className={
            props.getValue() === 'CURRENT'
              ? 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'
              : 'border text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'
          }
        >
          {props.getValue()}
        </span>
      ),
    },
    {
      header: 'Campaign Type and Cycle',
      accessorKey: 'campaign_type',
      cell: (props) => (
        <div className='flex items-center gap-2 justify-center'>
          {props.getValue()?.type}{' '}
          <span className='flex items-center justify-center gap-2 border text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300'>
            <GrPowerCycle className='color-white' />
            {props.getValue()?.cycle}{' '}
          </span>
        </div>
      ),
    },
    {
      header: 'Contract End',
      accessorKey: 'contract_end',
    },
    {
      header: 'Account Manager',
      accessorKey: 'account_manager',
      cell: (props) => (
        <img
          className='w-10 h-10 rounded-full bg-[#2fa8e0] dark:bg-[#fff]'
          src={props.getValue()}
          alt='Jese image'
        />
      ),
    },
    {
      header: 'Service',
      accessorKey: 'service',
      cell: (props) => (
        <span className=' border text-gray-800 text-xs font-medium mr-2 px-1.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300'>
          {props.getValue()}
        </span>
      ),
    },
    {
      header: '',
      accessorKey: 'isEnabled',
      cell: (props) => (
        <label className='relative inline-flex items-center cursor-pointer'>
          <input type='checkbox' className='sr-only peer' checked={props.getValue()} />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, globalFilter: filtering, selectFilter },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: (newFiltering) => {
      setFiltering(newFiltering);
    },
  });
  return (
    <>
      <div className='relative overflow-x-auto  dark:bg-gray-800'>
        <div className='flex gap-4 pb-4 bg-white dark:bg-gray-800'>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='text'
              id='table-search-users'
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search for anything'
            />
          </div>

          <Select
            options={[
              { value: '', label: 'All Services' },
              { value: 'PAID', label: 'PAID' },
              { value: 'SEO', label: 'SEO' },
              { value: 'Content Marketing', label: 'Content Marketing' },
              { value: 'Social Media', label: 'Social Media' },
            ]}
            placeholder='All Services'
          />
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-10'>
          <thead className='text-xs text-gray-400  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label htmlFor='checkbox-all-search' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={header.id === 'name' ? 'px-6 py-3' : 'px-6 py-3 text-center'}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
                      </div>
                    )}
                  </th>
                ))}
                <th scope='col' className='px-6 py-3'></th>
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label htmlFor='checkbox-table-search-1' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      cell.column.id === 'name'
                        ? 'px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                        : cell.column.id === 'account_manager'
                        ? 'px-6 py-4 flex justify-center'
                        : 'px-6 py-4 text-center'
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className='px-6 py-4 text-right'>
                  <div className='flex gap-2 text-right'>
                    <BsPersonGear size={20} />
                    <CiSettings size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-between dark:bg-gray-800'>
          <button
            onClick={() => table.previousPage()}
            className='flex items-center justify-center px-4 h-10 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              className='w-3.5 h-3.5 mr-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 5H1m0 0 4 4M1 5l4-4'
              />
            </svg>
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            className='flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            disabled={!table.getCanNextPage()}
          >
            Next
            <svg
              className='w-3.5 h-3.5 ml-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
