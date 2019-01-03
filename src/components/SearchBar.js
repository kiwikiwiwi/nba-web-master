import React from 'react';
import { AutoComplete, Input, Icon,  } from 'antd';
import nba from 'nba';
import {PROFILE_PIC_URL_PREFIX} from "../constants"

const Option = AutoComplete.Option;
export class SearchBar extends React.Component {

    state = {
        dataSource: [],
    }

    onSelect = (value) => {
        this.props.loadPlayerInfo(value);
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({fullName, playerId}) => (<Option key={playerId} value={fullName}>
                    <img className="player-option-image" alt="profile img" src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}/>
                    <span className="player-option-label">{fullName}</span>
                </Option>)
            ),
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                dataSource={dataSource}
                size = "large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search"/>} />
            </AutoComplete>
        );
    }
}