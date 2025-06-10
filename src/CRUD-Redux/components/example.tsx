// 'use client';
import React from 'react';

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import { useAppSelector } from '../hooks/store.tsx';
import { useUsersActions } from '../hooks/userActions.tsx';
import { useEdit } from '../app.tsx';
import { UserWithId } from '../store/users/slice.ts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const users = useAppSelector((state) => state.users)
  const {handleRemoveUser} = useUsersActions(); 
  const {setEdit} = useEdit()
  
  const Theme = () => {
    const theme = localStorage.getItem("theme")
    if(theme){
      return theme
    } 
    localStorage.setItem("theme", "")
    return ""
  };
  
  (() => {
    if(Theme() == "dark"){
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      return
    }
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "")
    return
  })()

  const handlePushEdit = (item: UserWithId) => {
    setEdit(item)
  }
  const handleChangeTheme = () => {
      if(localStorage.getItem("theme") == "dark"){
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "")
        return
      }
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      return
  }

  return (
    <>
      <div className='flex justify-between'>
        <Title className=''>
          Usuarios <Badge className='ml-3 bg-blue-200 rounded-full w-7 text-blue-500 justify-center'>{users.length}</Badge>
        </Title>
        <button
          type="button"
          onClick={handleChangeTheme}
          className="mt-4 whitespace-nowrap rounded-tremor-small bg-blue-500 rounded-2xl px-4 py-2.5 text-white hover:bg-blue-600 active:bg-blue-800 cursor-pointer font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
        >
          Change theme
        </button>
      </div>
      <Table className="table-auto whitespace-nowrap overflow-hidden text-ellipsis mt-8 max-w-7xl w-full">
        <TableHead className='max-w-7xl w-full overflow-x-auto'>
          <TableRow className='max-w-7xl w-full'>
            <TableHeaderCell className="pb-4 text-tremor-content-strong text-left dark:text-dark-tremor-content-strong">
              Id
            </TableHeaderCell>
            <TableHeaderCell className="max-w-1/4 w-full min-w-1/6 pb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Email
            </TableHeaderCell>
            <TableHeaderCell className="pb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Status
            </TableHeaderCell>
            <TableHeaderCell className="pb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="pb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Github
            </TableHeaderCell>
            <TableHeaderCell className="pb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Actions
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className='max-w-7xl w-full'>
          {users.map((item) => (
            <TableRow key={item.email} className='border-t border-gray-200 p-4 max-w-7xl w-full'>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.id}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <span
                  className={classNames(
                    item.status === 'Live'
                      ? ' bg-emerald-200 text-emerald-600 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20'
                      : 'bg-orange-200 text-orange-600 ring-orange-600/10 dark:bg-orange-500/20 dark:text-orange-500 dark:ring-orange-400/20',
                    'rounded-lg inline-flex items-center rounded-tremor-small px-2 py-0.5 text-tremor-label font-medium ring-1 ring-inset',
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className='flex content-center items-center gap-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs'>
                <img src={`https://unavatar.io/github/${item.github}`} className='w-10 rounded-lg' />
                {item.name}
                </TableCell>
              <TableCell>{item.github}</TableCell>
              <TableCell className='space-x-2'>
                <button onClick={() => handlePushEdit(item)} className='cursor-pointer text-gray-600 dark:text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button onClick={() => handleRemoveUser(item.id)} className='cursor-pointer text-red-600'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}