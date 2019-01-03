import React from 'react';
import _ from 'lodash';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';
import { Radio, Switch } from 'antd';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    }

    onCountSliderChange = (count) => {
        this.setState({ minCount: count });
    }

    onChartTypeChange = (e) => {
        console.log(e.target.value);
        this.setState({ chartType: e.target.value });
    }

    onTooltipChange = (checked) => {
        this.setState({ displayTooltip: checked });
    }

    render() {
        return (
            <div className="data-view">
                <div className="space"/>
                <ShotChart className="shot-chart"
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayTooltip={this.state.displayTooltip}
                />
                <div className="filters">


                    <div className="controller">
                            <RadioGroup  onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio  value="hexbin">Hexbin</Radio>
                                <Radio  value="scatter">Scatter</Radio>
                            </RadioGroup>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                onChange={this.onTooltipChange}
                                defaultChecked />
                    </div>
                    <br/>
                    <div className="count-slider">
                        {this.state.chartType === 'hexbin' ?
                            <CountSlider  value={this.state.minCount}
                                         onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                            /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
