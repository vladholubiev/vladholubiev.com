import React from 'react';
import {Card, List, Typography} from 'antd';
import Layout from '../components/Layout';

const data = [
  {shortcut: 'jr', code: `($VAR0$ as jest.Mock).mockResolvedValue($END$);`},
  {
    shortcut: 'jro',
    code: `($VAR0$ as jest.Mock).mockResolvedValueOnce($END$);`
  },
  {
    shortcut: 'jm',
    code: `jest.mock('$VAR0$');`
  },
  {
    shortcut: 'it',
    code: `it('should $END$', () => {

});`
  },
  {
    shortcut: 'ita',
    code: `it('should $END$', async() => {

});`
  },
  {
    shortcut: 'experr',
    code: `it('should throw error if ', async () => {
  try {
    await $NAME$();
  } catch ({message, statusCode}) {
    expect(message).toEqual();
    expect(statusCode).toEqual();
  }
});`
  },
  {
    shortcut: 'describe',
    code: `describe('$END$', () => {

});`
  },
  {
    shortcut: 'asjm',
    code: `($VAR0$ as jest.Mock)`
  },
  {
    shortcut: 'toq',
    code: `expect($VAR0$).toEqual({$END$});`
  },
  {
    shortcut: 'tobef',
    code: `expect($END$).toBeInstanceOf(Function);`
  },
  {
    shortcut: 'tobec',
    code: `expect($END$).toHaveBeenCalledWith();`
  }
];

export default () => (
  <Layout>
    <h1>WebStorm Live Templates for Jest</h1>

    {data.map(item => (
      <>
        <Card title={item.shortcut} key={item.shortcut}>
          <pre>{item.code}</pre>
        </Card>
        <br />
      </>
    ))}
  </Layout>
);
