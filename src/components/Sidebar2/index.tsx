import classNames from 'classnames/bind';
import styles from './Sidebar2.module.scss';

const cx = classNames.bind(styles);

function Sidebar2() {
    return (
        <aside className={cx('wrapper')}>
            <h2>Sidebar2</h2>
        </aside>
    ); 
}

export default Sidebar2;
