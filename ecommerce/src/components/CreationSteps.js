import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import ProductForm from "./ProductForm";
import PartForm from "./PartForm";
import OptionForm from "./OptionForm";
import PriceRuleForm from "./PriceRuleForm";
import ProhibitedCombinations from "./ProhibitedCombinations";
const steps = [
  {
    title: 'Product',
    content: <ProductForm/>,
  },
  {
    title: 'Parts',
    content: <PartForm/>,
  },
  {
    title: 'Options',
    content: <OptionForm/>,
  },
  {
    title: 'Custom Price',
    content: < PriceRuleForm/>,
  },
  {
    title: 'Prohibited Combinations',
    content: < ProhibitedCombinations/>,
  },
];
const CreationStepsComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '450px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <div style={{marginTop: '60px', marginLeft:'150px', marginRight: '150px'}}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
export default CreationStepsComponent;