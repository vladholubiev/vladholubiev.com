import React, {FC, useState} from 'react';
import {Button, Col, Divider, Input, Row, message} from 'antd';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {sortKeys, sortOrder} from 'sort-o';
import copy from 'copy-to-clipboard';

const DEFAULT_VALUE = `{"hello": "there", "i": "am", "a": "json", "also": {"values":true,"nested":1}}`;

const Page: FC<any> = function () {
  const [inputJSON, setInputJSON] = useState(DEFAULT_VALUE);

  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Sort JSON Alphabetically</h1>
          <Input.TextArea
            onChange={e => {
              const json = e.currentTarget.value;

              if (!isValidJSON(json)) {
                return;
              }

              setInputJSON(e.currentTarget.value);
            }}
            defaultValue={DEFAULT_VALUE}
            style={{fontSize: 18}}
          />
          <Divider>
            <Button
              type="primary"
              onClick={() => {
                copy(prettifyJSON(inputJSON));
                message.success('Copied', 1);
              }}
            >
              Copy Sorted JSON
            </Button>
          </Divider>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SyntaxHighlighter
            language="json"
            style={atomDark}
            customStyle={{margin: 0}}
            showLineNumbers={true}
          >
            {prettifyJSON(inputJSON)}
          </SyntaxHighlighter>
        </Col>
      </Row>
    </>
  );
};

function isValidJSON(json: string): boolean {
  try {
    JSON.parse(json);

    return true;
  } catch {
    return false;
  }
}

function prettifyJSON(json: string): string {
  try {
    const obj = JSON.parse(json);

    return JSON.stringify(sortKeys(obj, sortOrder.ASC) as Record<string, unknown>, null, 2);
  } catch {
    return '{}';
  }
}

export default Page;
