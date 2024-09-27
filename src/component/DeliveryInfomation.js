import React, { useState } from 'react';
import Modal from 'react-modal';
import Provinces from '../data/Provinces.json';

Modal.setAppElement('#root');

export default function DeliveryInfomation() {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const renderProvinceOptions = () => {
        return Provinces.map((province) => (
            <option key={province.code} value={province.name}>
                {province.name}
            </option>
        ));
    };

    const renderDistrictOptions = () => {
        if (!selectedProvince) {
            return null;
        }

        const selectedProvinceData = Provinces.find((province) => province.name === selectedProvince);
        return selectedProvinceData.districts.map((district) => (
            <option key={district.code} value={district.name}>
                {district.name}
            </option>
        ));
    };

    const renderWardOptions = () => {
        if (!selectedProvince || !selectedDistrict) {
            return null;
        }

        const selectedDistrictData = Provinces
            .find((province) => province.name === selectedProvince)
            .districts.find((district) => district.name === selectedDistrict);

        return selectedDistrictData.wards.map((ward) => (
            <option key={ward.code} value={ward.name}>
                {ward.name}
            </option>
        ));
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict("");
        setSelectedWard("");
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard("");
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    return (
        <>
            <div className="delivery_infomation">
                <div className="b_1">
                    <p className="title">My address</p>
                    <button onClick={openModal} className="add_address">
                        +&nbsp;&nbsp;&nbsp;Add new address
                    </button>
                </div>
                <div className="b_2">
                    <p className="title">Address</p>
                    <div className="item">
                        <div className="b_left">
                            <div className="b_left_1">
                                <p className="name">Thế Huy</p>
                                <p className="phone">+84 808 888 845</p>
                                <p>Default</p>
                            </div>
                            <div className="b_left_2">
                                <p>194 Nguyễn Ảnh Thủ, Thới Tam Thôn, huyện Hóc Môn, HCM</p>
                                <p>Xã Thới Tam Thôn, Huyện Hóc Môn, TP. Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className="b_right">
                            <div className="b_btn">
                                <button className="btn_update">
                                    <i className="fa-solid fa-pen"></i>Update
                                </button>
                                <button className="btn_delete">
                                    <i className="fa-solid fa-trash-can"></i>Delete
                                </button>
                            </div>
                            <button className="set_default_btn">Set default address</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="b_modal">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Form Modal"
                    style={modalStyles}
                    className={"modal"}
                >
                    <p className='title' style={titleStyle}>Add new address</p>
                    <form>
                        <div style={box_form_address}>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="name" style={labelStyle}>Tên:<span>*</span></label>
                                <input style={inputStyle} />
                            </div>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="phone" style={labelStyle}>Phone:<span>*</span></label>
                                <input style={inputStyle} />
                            </div>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="province" style={labelStyle}>Tỉnh/Thành phố:<span>*</span></label>
                                <select id="province" value={selectedProvince} onChange={handleProvinceChange} style={selectStyle}>
                                    <option value="">--- Chọn ---</option>
                                    {renderProvinceOptions()}
                                </select>
                            </div>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="district" style={labelStyle}>Quận/Huyện:<span>*</span></label>
                                <select id="district" value={selectedDistrict} onChange={handleDistrictChange} style={selectStyle}>
                                    <option value="">--- Chọn ---</option>
                                    {renderDistrictOptions()}
                                </select>
                            </div>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="ward" style={labelStyle}>Xã/Phường:<span>*</span></label>
                                <select id="ward" value={selectedWard} onChange={handleWardChange} style={selectStyle}>
                                    <option value="">--- Chọn ---</option>
                                    {renderWardOptions()}
                                </select>
                            </div>
                            <div className="box_input" style={boxInputStyle}>
                                <label htmlFor="sn" style={labelStyle}>Số nhà:<span>*</span></label>
                                <input style={inputStyle} />
                            </div>
                        </div>

                        <button type="submit" style={buttonStyle}>Gửi</button>
                    </form>
                    <button onClick={closeModal} style={{ ...buttonStyle, ...closeButtonStyle }}>Đóng</button>
                </Modal>
            </div>
        </>
    );
}
const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        position: "absolute",
        top: '50%',
        left: '50%',
        zIndex: 1000,
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: "1px solid #ccc",
        background: "#fff",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "4px",
        outline: "none",
        padding: "20px",
        width: 'fit-content',
    }
};

const box_form_address = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",  // Sửa lại thành "gridTemplateColumns"
    gap: "0.5rem"
};

const titleStyle = {
    fontSize: "var(--fz_medium)",

    color: "var(--cl_bg)",
    padding: "10px",
    fontWeight: "700",
    borderRadius: "4px",
    marginBottom: "10px",
    textAlign: "center"
};

const boxInputStyle = {
    marginBottom: "15px",
};

const labelStyle = {
    display: "block",
    marginBottom: "5px",
};

const selectStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
};

const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
};

const closeButtonStyle = {
    backgroundColor: "#dc3545",
};
