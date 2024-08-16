import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import ProductForm from "../components/ProductForm";
import PartForm from "../components/PartForm";
import PartsOptionsForm from "../components/OptionForm";
import PriceRuleForm from "../components/PriceRuleForm";
import ProhibitedCombinations from "../components/ProhibitedCombinations";

const steps = [
  {
    title: 'Product',
    content: <ProductForm />,
  },
  {
    title: 'Parts',
    content: <PartForm />,
  },
  {
    title: 'Options',
    content: <PartsOptionsForm />,
  },
  {
    title: 'Custom Price',
    content: <PriceRuleForm />,
  },
  {
    title: 'Prohibited Combinations',
    content: <ProhibitedCombinations />,
  },
];

const CreationStepsComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const next = () => {
    if (isFormSubmitted) {
      setCurrent(current + 1);
      setIsFormSubmitted(false); // Reset after moving to next step
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setIsFormSubmitted(true);
    next();
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
    <div style={{ marginTop: '60px', marginLeft: '150px', marginRight: '150px' }}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {React.cloneElement(steps[current].content, {
          onSubmit: handleFormSubmit,
          formData: formData
        })}
      </div>
      <div style={{ marginTop: 24 }}>
        <Button
          type="primary"
          onClick={() => next()}
          disabled={!isFormSubmitted}
        >
          Next
        </Button>
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{ margin: '0 8px' }}
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
