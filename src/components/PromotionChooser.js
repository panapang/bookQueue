import React from 'react';
import PromotionChooserRow from './PromotionChooserRow';

class PromotionChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.list });
  }

  render() {

    const item = (itemData) => {
      return <PromotionChooserRow key={itemData.id} name={itemData.name} active={itemData.active} />
    };

    return (
      <div className="seating">
        {this.state.list.map(item)}
      </div>
    );
  }
}

export default PromotionChooser;