import { FC } from 'react';
import styles from './IconWrapper.module.scss';
import classNames from 'classnames/bind';
import { iIconWrapperProps } from './types';

const cx = classNames.bind(styles);

export const IconWrapper: FC<iIconWrapperProps> = ({ children, width, height, className = ''  }) => (
    <i className={cx(styles.icon, className)} style={{ width: width, height: height }}>
        {children}
    </i>
);
