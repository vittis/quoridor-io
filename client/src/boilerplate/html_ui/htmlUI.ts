import {game} from "../game"
import {Network} from "../network"

export namespace HtmlUI {
    var containerUI : HTMLElement;

    var playRankedButton : HTMLElement;
    var createRoomButton : HTMLElement;

    export function setup() {
        containerUI = document.getElementById("containerUI");
        playRankedButton = document.getElementById("playRankedButton");
        createRoomButton = document.getElementById("createRoomButton");

        playRankedButton.addEventListener('click', onClickPlayRanked);
    }


    function onClickPlayRanked() {
        console.log("onclickplayranked button");
        containerUI.style.display = 'none';
        var mainScene :any = game.scene.getScene('MainScene');
        mainScene.onClickPlayRanked();

    }


}