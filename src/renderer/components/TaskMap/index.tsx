import { Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Mission } from 'common/QuestModel';
import util from 'renderer/shared/util';
import constants from 'renderer/shared/constants';
import Map0 from '../maps/Map0';

import './index.scss';

import mapPng from '../../../../assets/floor.png';

const TaskMap = ({ mission }: { mission: Mission }) => {
  const mapEl = useRef(null);

  useEffect(() => {
    console.log(mapEl.current);

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

  return (
    <>
      <Row justify="center" ref={mapEl}>
        <div className="map-box">
          <img alt="" src={mapPng} className="map-image" />
          <Map0 className="map-svg" />
        </div>
      </Row>
      <div id="tooltip" role="tooltip">
        <div className="tooltip-title" />
        <div id="arrow" data-popper-arrow />
      </div>
    </>
  );
};

export default TaskMap;
