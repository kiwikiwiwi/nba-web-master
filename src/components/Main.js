import React from 'react';
import { DataViewContainer } from './DataViewContainer';
import nba from 'nba'
import { Profile } from './Profile';
import { SearchBar } from "./SearchBar"
import { DEFAULT_PLAYER_INFO } from "../constants"

export class Main extends React.Component {

    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.playerName);
        // console.log(this.state.playerInfo.playerId);
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({ PlayerID: playerId}).then((response) => {

            const playerInfo = Object.assign(
                {}, response.commonPlayerInfo[0], response.playerHeadlineStats[0]
            );
            this.setState({ playerInfo });
        });
    }

    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}
