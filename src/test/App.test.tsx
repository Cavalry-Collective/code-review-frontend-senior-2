/* eslint-disable */
import React from 'react'
import {
  cleanup,
  render,
  screen, waitFor
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'
import moment from "moment"

const taskData = {
  title: 'test todo',
  key: 'test'
}

afterEach(() => {
  cleanup()
  localStorage.clear()
})

test('渲染', () => {
  /*应用正常插入*/
  render(<App/>)

  const linkElement = screen.getByText(/Multi-level Todo List/i)
  expect(linkElement).toBeInTheDocument()
})

test('添加任务', async () => {
  /*展示弹窗*/
  render(<App/>)

  expect(screen.queryByText('提示')).toBeNull()
  const addBtn = screen.getByTestId('add-button')
  userEvent.click(addBtn)
  expect(screen.queryByText('提示')).toBeInTheDocument()

  /*添加操作*/
  // 判断input初始时为空
  expect(screen.queryByText(taskData.title)).toBeNull()
  let inputTitle = screen.getByTestId('input-task-title')
  // 写数据
  userEvent.type(inputTitle, taskData.title)

// 点击ok按钮
  await waitFor(() => {
    userEvent.click(screen.getByText('OK'))
  })

  /*验证页面*/
  expect(screen.getByTestId('task-title')).toHaveTextContent(taskData.title)

})

test('持久缓存', async () => {
  await waitFor(() => {
    render(<App/>)
  })
  expect(screen.queryByTestId('task-title')).toBeNull()
  cleanup()
  localStorage.setItem('todo-list', JSON.stringify([taskData]))

  await waitFor(() => {
    render(<App/>)
  })
  expect(screen.queryByTestId('task-title')).toBeInTheDocument()
  expect(screen.getByTestId('task-title')).toHaveTextContent(taskData.title)
})

test('支持编辑', async () => {
  localStorage.setItem('todo-list', JSON.stringify([taskData]))
  await waitFor(() => {
    render(<App/>)
  })

  // 已保存的任务名
  expect(screen.getByTestId('task-title')).toHaveTextContent(taskData.title)

  const editTitle = 'edit test'

  // 点击编辑
  userEvent.click(screen.getByTestId('edit-button'))
  // 输入框有要编辑的值
  expect(screen.getByTestId('input-task-title')).toHaveValue(taskData.title)

  userEvent.type(screen.getByTestId('input-task-title'), editTitle)
// // 点击ok按钮
  await waitFor(() => {
    userEvent.click(screen.getByText('OK'))
  })
  expect(screen.getByTestId('task-title')).toHaveTextContent(editTitle)
})

test('设置日期', async () => {
  render(<App/>)
  expect(screen.queryByTestId('task-title')).toBeNull()
  expect(screen.queryByTestId('task-date')).toBeNull()

  // 添加
  userEvent.click(screen.getByTestId('add-button'))

  // 写数据
  userEvent.type(screen.getByTestId('input-task-title'), taskData.title)

  // 创建明天时间戳
  const date = moment().add(1,"d").format('YYYY-MM-DD')

  await userEvent.type(
    screen.getByTestId('input-task-date'),
    `${date}{enter}`
  )
  await waitFor(() => {
    userEvent.click(screen.getByText('OK'))
  })
  // 时间提示展现
  expect(screen.queryByTestId('task-title')).toBeInTheDocument()
  expect(screen.queryByTestId('task-date')).toBeInTheDocument()

  // 校验值是否正确
  expect(screen.getByTestId('task-date')).toHaveTextContent(date)
  // 校验是否展示 过期图标
  expect(screen.queryByTestId('date-overdue')).toBeNull()
})

test('截止日期过期', async () => {
  render(<App/>)

  // 添加
  userEvent.click(screen.getByTestId('add-button'))

  // 写数据
  userEvent.type(screen.getByTestId('input-task-title'), taskData.title)

  // 创建昨天时间戳
  const date = moment().subtract(1, 'd').format('YYYY-MM-DD')
  await userEvent.type(
    screen.getByTestId('input-task-date'),
    `${date}{enter}`
  )
  await waitFor(() => {
    userEvent.click(screen.getByText('OK'))
  })

  // 校验值是否正确
  expect(screen.getByTestId('task-date')).toHaveTextContent(date)

  // 校验是否展示 过期图标
  expect(screen.queryByTestId('date-overdue')).toBeInTheDocument()

})
