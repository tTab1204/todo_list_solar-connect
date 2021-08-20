import React, { ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { SpinSize } from 'antd/lib/spin';

interface ILoadingProps {
  size?: SpinSize;
  style?: React.CSSProperties;
}

export default function Loading(props: ILoadingProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        height: '600px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingOutlined style={{ fontSize: props.size === 'large' ? 100 : 50, ...props.style }} />;
    </div>
  );
}
