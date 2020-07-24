import React, { useState } from "react";
import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

const SidebarMenu = ({ children, MenuBar }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <MenuBar />
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default SidebarMenu;
