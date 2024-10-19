import React from 'react';
import Styles from "./FriendList.module.scss";

const FriendList: React.FC = () => {
    return (
        <div className={Styles.containerListFe}>
          <div className={Styles.headList}>
            <p className={Styles.nameList}>Danh sach ban be hien co</p>
            <p className={Styles.numberList}>20 Nguoi ban</p>
          </div>
          <div className={Styles.userListFr}>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt1.jfif`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt2.jpg`} alt="avt2" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt3.jpg`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt4.jpg`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt5.jfif`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt1.jfif`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
            <div className={Styles.iconFr}>
              <img src={`${process.env.PUBLIC_URL}/asset/img/avt1.jfif`} alt="avt1" className={Styles.imgListFr}/>
              <p className={Styles.nameListFr}>Nguyen Duc Thang</p>
              <button className={Styles.btnItemFr}>Nhan tin</button>
              <button className={Styles.btnItemPr}>Xem trang ca nhan</button>
            </div>
          </div>
        </div>
    );
};

export default FriendList;
