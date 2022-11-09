import {
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Row,
  Space,
  Statistic,
  Typography,
} from 'antd';
import { useContext, useEffect, useRef } from 'react';
import { Mission } from 'common/QuestModel';
import { useNavigate, useParams } from 'react-router-dom';
import ItemPage from 'renderer/shared/ItemPage';
import util from 'renderer/shared/util';
import constants from 'renderer/shared/constants';

import actionTypes from '../shared/actionTypes';

import MainContext from '../store/MainContext';
import MissionForm from './forms/MissionForm';

import Map0 from './maps/Map0';

import './MissionPage.scss';

import mapPng from '../../../assets/floor.png';

const { Title } = Typography;

// reference: https://ant.design/components/page-header-cn/

const MissionPage = () => {
  const params = useParams();
  const { state, dispatch } = useContext(MainContext);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const mapEl = useRef(null);

  useEffect(() => {
    console.log(mapEl.current);
    const mission: Mission = util.findNode(state.questData, params.id!)!;

    const pointKeys = mission.children.map((m) => m.pointKey);

    mapEl.current.querySelectorAll('svg g').forEach((node) => {
      const textEl = node.querySelector(':scope>text');
      if (!textEl) return;

      const key =
        parseInt(textEl.textContent, 10) -
        1; /*  point number starting from 1 */

      const index = pointKeys.indexOf(key);
      if (index >= 0) {
        node.classList.add('active');

        const tooltip = document.querySelector('#tooltip');
        util.setupPopover(
          node,
          tooltip as HTMLElement,
          `步骤(${index + 1}) ${constants.POINTS[key].short_desc}`
        );
      } else {
        node.classList.remove('active');
      }
    });
  });

  const onSave = (mission: Mission) => {
    dispatch({
      type: actionTypes.UPDATE_MISSON,
      value: { ...mission, ...form.getFieldsValue() },
    });

    console.log('updating Mission with...', form.getFieldsValue());
  };

  const onDelete = (mission: Mission) => {
    dispatch({
      type: actionTypes.DELETE_MISSION,
      value: mission.key,
    });
    navigate('/');
  };

  const renderForm = (mission: Mission) => {
    return <MissionForm mission={mission} form={form} />;
  };

  const renderContent = (mission: Mission) => (
    <>
      <Row>
        <Col span={8}>
          <Title type="secondary" level={5}>
            基本信息
          </Title>
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="任务区域">
              {mission.region}
            </Descriptions.Item>
            <Descriptions.Item label="描述">
              {mission.description}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Row justify="start">
            <Space size="large">
              <Statistic
                title="任务总时长（最短）"
                value={`${util.missionTime(mission)} 分钟`}
              />
            </Space>
          </Row>
        </Col>
        <Col span={16}>
          <Row justify="center" ref={mapEl}>
            <div className="map-box">
              <img src={mapPng} className="map-image" />
              <Map0 className="map-svg" />
            </div>
          </Row>
          <div id="tooltip" role="tooltip">
            <div className="tooltip-title" />
            <div id="arrow" data-popper-arrow />
          </div>
        </Col>
      </Row>
    </>
  );

  return (
    <ItemPage
      itemType="任务"
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={(mission: Mission) => mission}
      onDelete={onDelete}
    />
  );
};

export default MissionPage;
