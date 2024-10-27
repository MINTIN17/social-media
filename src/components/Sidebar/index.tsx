import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles)

function Sidebar() {
    return <aside className={cx('wrapper')}>
        
        <div className={cx('menu')}>
            <div className={cx('invite-fr')}>
                <div> Lời mời kết bạn</div>
                <div className={cx('more')}>
                    Xem tất cả
                </div>
                
            </div>
            <div className={cx('line')}></div>
            <div className={cx('friend-makers')}>
                <div className={cx('avatar')}>
                    <img src='/asset/img/avatar.jpg' alt='avatar-img' className={cx('avatar-img')} />
                </div>
                <div className={cx('infor')}>
                    <div className={cx('name-time')}>
                        <div className={cx('name')}>Violet Evergarden</div>
                        <div className={cx('time')}> 1 tuần</div>
                    </div>
                    <div className={cx('acp-ref')}>
                        <div className={cx('acp')}> Xác nhận</div>
                        <div className={cx('refuse')}>Hủy</div>
                    </div>
                </div>
            </div>
            <div className={cx('read-more')}>XEM THÊM</div>
        </div>

        <div className={cx('friend')}>
            <div className={cx('header')}>
                <div style={{padding: 10}}>Người liên hệ</div>
                <img src='/asset/icon/search.svg' alt='search-icon' className={cx('search-icon')}/>
            </div>
            <div className={cx('line')}></div>
        </div>
        

    </aside>
}

export default Sidebar;