import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Panel from 'react-native-panel';

const styles = StyleSheet.create({});

class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, content } = this.props;
    return (
      <Panel header={title}>
        <Text style={styles.myDescription}>{content}</Text>
      </Panel>
    );
  }
}

export default DetailsPanel;
