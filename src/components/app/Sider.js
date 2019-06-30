import React from 'react';
import { connect } from 'react-redux';
import { Link, generatePath, matchPath, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Typography } from 'antd';
import * as paths from '../../shared/paths';
import memoize from 'lodash/memoize';
import { openModal as openModalAction } from '../../redux/modules/general/actions';
import { modals } from '../../shared/constants';
import { getWorkoutsList } from '../../redux/modules/workouts/selectors';

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Text } = Typography;

const getSelectedKeys = memoize(path => {
  if (matchPath(path, { path: paths.POPULAR })) {
    return [paths.POPULAR];
  } else if (matchPath(path, { path: paths.STARRED })) {
    return [paths.STARRED];
  } else if (matchPath(path, { path: paths.WORKOUT })) {
    const match = matchPath(path, { path: paths.WORKOUT });
    return [generatePath(paths.WORKOUT, match.params)];
  } else {
    return [];
  }
});

function AppSider({ location, match, openModal, workouts }) {
  const selectedKeys = getSelectedKeys(location.pathname);

  return (
    <Sider
      width={200}
      style={{ background: '#fff', overflowX: 'hidden', overflowY: 'auto' }}
    >
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={selectedKeys}
      >
        <SubMenu
          key="my"
          title={
            <span>
              <Icon type="unordered-list" />
              My Workouts
            </span>
          }
        >
          {workouts.map(workout => {
            const path = generatePath(paths.WORKOUT, workout);
            return (
              <Menu.Item key={path}>
                <Link to={path}>
                  <Text ellipsis style={{ width: '100%' }}>
                    {workout.name}
                  </Text>
                </Link>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key="3"
            onClick={() => openModal({ modal: modals.MANAGE_WORKOUT })}
          >
            <Icon type="plus" />
            Add New
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={paths.POPULAR}>
          <Link to={paths.POPULAR}>
            <Icon type="rise" />
            <span>Popular Workouts</span>
          </Link>
        </Menu.Item>

        <Menu.Item key={paths.STARRED}>
          <Link to={paths.STARRED}>
            <Icon type="star" />
            <span>Starred Workouts</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

function mapStateToProps(state) {
  return {
    workouts: getWorkoutsList(state)
  };
}

const actions = {
  openModal: openModalAction
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(AppSider)
);
