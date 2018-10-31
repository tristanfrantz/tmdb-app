import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginLeft: 5,
    marginRight: 5,
  },
  toggleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    paddingRight: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
  },
});

class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  toggle = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { title, content } = this.props;
    const { isCollapsed } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => this.toggle()}>
          <View>
            <Text style={styles.toggleText}>{title}</Text>
          </View>
          <View style={styles.iconContainer}>
            {isCollapsed ? (
              <Icon size={22} name="angle-down" style={styles.addIcon} />
            ) : (
              <Icon size={22} name="angle-up" style={styles.addIcon} />
            )}
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default DetailsPanel;
