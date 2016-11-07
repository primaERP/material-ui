import React, {Component} from 'react';

import FullWidthSection from '../../FullWidthSection';
import withWidth from 'material-ui/utils/withWidth';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {maxWidth: 906};

class FlexiTestMenuPage extends Component {
  constructor() {
    super();

    this.state = {
      items: ['Single', '1.15', 'Double', 'Add space before paragraph',
        'Add space after paragraph', 'Custom spacing...',
      ],
      focusedItem: 'Add space before paragraph',
      focusedItemIndex: 3,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleItemFocus(action) {
    let { focusedItem, focusedItemIndex } = this.state;
    const { items } = this.state;
    switch (action) {
      case 'increment':
        if (focusedItemIndex === items.length - 1) {
          focusedItemIndex = 0;
          focusedItem = items[0];
        } else {
          focusedItemIndex += 1;
          focusedItem = items[focusedItemIndex];
        }
        break;
      case 'decrement':
        if (focusedItemIndex === 0) {
          console.log('Zavrit menu');
          focusedItemIndex = items.length - 1;
          focusedItem = items[focusedItemIndex];
        } else {
          focusedItemIndex -= 1;
          focusedItem = items[focusedItemIndex];
        }
        break;
      default:
        break;
    }
    this.setState({ focusedItemIndex, focusedItem });
  }


  handleKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();
    switch (event.keyCode) {
      case 27: // handle ESC
        this.askForClose();
        break;
      case 38: // handle arrow-up
        this.handleItemFocus('decrement');
        break;
      case 40: // handle arrow-down
        this.handleItemFocus('increment');
        break;
      default:
        break;
    }
  }

  menuItemFactory() {
    return this.state.items.map((item) => {
      const props = {
        key: item,
        primaryText: item,
        insetChildren: true,
        value: item,
      };
      return <MenuItem {...props} />;
    });
  }

  render() {
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <Menu
          desktop={true}
          width={320}
          value={this.state.focusedItem}
          onKeyDown={this.handleKeyDown}
        >{this.menuItemFactory()}
        </Menu>
      </FullWidthSection>
    );
  }
}

export default withWidth()(FlexiTestMenuPage);
