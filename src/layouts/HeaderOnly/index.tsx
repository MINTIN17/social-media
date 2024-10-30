import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

interface HeaderOnlyProps {
    children: ReactElement;
}

function HeaderOnly({ children }: HeaderOnlyProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}><Header /></div>
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
