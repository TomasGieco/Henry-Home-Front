import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../FilesStore/Actions";
import Carrousel from "../UI/Carrousel";
import imgDefault from "../assets/img/HenryHome.png";
import { Typography } from "antd";
import { PushpinOutlined, DollarOutlined } from "@ant-design/icons";
import "../assets/css/Detail/Detail.scss";




const { Title, Text } = Typography;

export default function Detail(props) {
  const dispatch = useDispatch();
  const { userDetail} = useSelector(state=>state)
  const find = userDetail?.Housings?.filter(
    (e) => e.id === props.match.params.id
  );

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props, userDetail]);

  let id = props.match.params.id;

  let hotel = useSelector((state) => state.detail);
  return (
    <div className="allDetail">
      <div className="navbar">
      </div>
      <div className={!find ? "isOwner" : "isNotOwner"}>
        <Link to={`/home/${id}/editar`}>
          <button>Editar</button>
        </Link>
      </div>
      <Title className="title">{hotel.name}</Title>
      <div className="carrouselConteiner">
        <Carrousel
          imgs={hotel.images ? hotel.images : [imgDefault]}
          dotsBool={true}
          styles="imgDetail"
        />
      </div>
      <Text>Publicado por {hotel.userMod.email}</Text>
      <div className="description">
        <Text>{hotel.description}</Text>
        <br />
        <br />
        <Text className="location">
          <PushpinOutlined /> {hotel.Location ? hotel.Location.name : null}
        </Text>
        <br />
        <br />
        <Text className="price">
          <DollarOutlined /> {hotel.pricePerNight}
        </Text>
        <Text>Cantidad de camas: {hotel.numberOfBeds}</Text>
      </div>
      {/* <div className="facilities">
        Facilities:
        {hotel.Facilities?.map((e) => {
          return <Text>{e.name} </Text>;
        })}
      </div>
      <div className="services">
        Services:
        {hotel.Services?.map((e) => {
          return <Text>{e.name} </Text>;
        })}
      </div> */}

      <div className="facilities">
        <p className="offer">¿Que ofrece este lugar?</p>
        {hotel.Facilities?.map((e) => {
          return <Text className="text-detail">•{e.name} </Text>;
        })}
        {hotel.Services?.map((e) => {
          return <Text className="text-detail">•{e.name} </Text>;
        })}
      </div>
        {
        userDetail ? (<Link to={`/home/${props.match.params.id}/reservation`}>
          <button className="reservar">Reservar</button>
        </Link>) : (<div>
          <p>Necesitas estar logeado para reservar</p>
        </div>)
        }
      <div className="btnDetail">
        

        <Link to="/home">
          <button className="back">Go back</button>
        </Link>
      </div>
    </div>
  );
}