import classNames from 'classnames/bind';
import { ReactNode } from 'react'; // Cập nhật từ ReactElement thành ReactNode
import styles from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
    children: ReactNode; // Thay đổi từ ReactElement thành ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>
                    <div className={cx('post')}>{children}</div>
                    <div className={cx('side-bar')}><Sidebar /></div>
                </div> 
            </div>
        </div>
    );
}

export default DefaultLayout;
