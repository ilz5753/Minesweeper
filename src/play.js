import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { isEqual, isUndefined } from "lodash";
import {
  Header,
  width,
  height,
  GameView,
  ENEX,
  rippleColor,
  center,
  Styles,
  SelectBoxGroup,
  InputGroupPicker,
  ArrMaker,
  BUTTON,
  android_ripple,
  primary,
  DataMaker,
  Minesweeper,
  TimerIc,
} from "../components";

export default function Play() {
  let timerRef = useRef();
  let gameStates = {
    selectLevel: 0,
    play: 1,
    win: 2,
    gameOver: 3,
  };
  let [gameState, setGameState] = useState(gameStates.selectLevel);
  let [Timer, setTimer] = useState(0);
  let selectBoxGroups = [
    {
      text: "Easy",
      rows: 9,
      columns: 7,
      minesweepers: 18,
    },
    {
      text: "Medium",
      rows: 15,
      columns: 9,
      minesweepers: 30,
    },
    {
      text: "Hard",
      rows: 21,
      columns: 11,
      minesweepers: 63,
    },
    {
      text: "Custom",
      rows: 18,
      columns: 10,
      minesweepers: 42,
    },
  ];
  let [selectBoxGroup, setSelectBoxGroup] = useState(
    selectBoxGroups.map((s, i) => ({ ...s, isSelected: isEqual(i, 0) })),
  );
  let [activeLevel, setActiveLevel] = useState(selectBoxGroup[0]);
  let [GameData, setGameData] = useState();
  let [BombsNumber, setBombsNumber] = useState(activeLevel.minesweepers);
  let IsSelectLevel = isEqual(gameState, gameStates.selectLevel);
  let IsWin = isEqual(gameState, gameStates.win);
  let IsGameOver = isEqual(gameState, gameStates.gameOver);
  let ct = () => clearInterval(timerRef.current);
  let onBoxPress = (index) => {
    setSelectBoxGroup((sbg) => {
      sbg = sbg.map((item, i) => {
        item.isSelected = isEqual(i, index);
        return item;
      });
      return sbg;
    });
    setActiveLevel(selectBoxGroup[index]);
  };
  let start = () => {
    let item = selectBoxGroup.filter(({ isSelected }) => isSelected)[0];
    setActiveLevel(item);
    setGameData(DataMaker(item));
    setGameState(gameStates.play);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
  };
  let restart = () => {
    setGameState(gameStates.selectLevel);
    ct();
    setTimer(0);
    setGameData(undefined);
  };
  let onChange = (n = 0, key) => {
    let sbgCopy = [...selectBoxGroup];
    sbgCopy = sbgCopy.map((sbg) => {
      if (isEqual(sbg.text, "Custom")) {
        sbg[key] = n;
        if (isEqual(key, "minesweepers")) setBombsNumber(n);
      }
      return sbg;
    });
    setSelectBoxGroup(sbgCopy);
  };
  let GameOver = () => {
    ct();
    setGameState(gameStates.gameOver);
  };
  let Win = () => {
    ct();
    setGameState(gameStates.win);
  };
  useEffect(() => {
    if (isEqual(Timer, 999) && !isUndefined(timerRef.current)) ct();
    if (IsSelectLevel) setBombsNumber(activeLevel.minesweepers);
  }, [IsSelectLevel, Timer, BombsNumber, activeLevel]);
  return (
    <Animated.View style={[styles.main]}>
      <ENEX isOverlayed={false} isHaveVerticalPadding>
        <Header
          items={[
            {
              Icon: Minesweeper,
              Num: BombsNumber,
            },
            {
              Icon: TimerIc,
              Num: Timer,
            },
          ]}
        />
        {!isUndefined(GameData) && (
          <GameView
            {...{
              data: GameData,
              GameOver,
              Win,
              setBombsNumber,
              ...activeLevel,
            }}
          />
        )}
      </ENEX>
      {IsSelectLevel && (
        <ENEX>
          <Animated.View style={[styles.modalView, Styles.br]}>
            <Animated.View style={[Styles.fw, styles.modalHeader, center]}>
              <Animated.Text style={[styles.modalHeaderText]}>
                SELECT YOUR LEVEL
              </Animated.Text>
            </Animated.View>
            <SelectBoxGroup
              {...{
                list: selectBoxGroup,
                onBoxPress,
              }}
            />
            <InputGroupPicker
              {...{
                isEnabled: selectBoxGroup.find((s) => isEqual(s.text, "Custom"))
                  .isSelected,
                inputs: [
                  {
                    title: "ROWS",
                    list: ArrMaker(13, 9),
                    onChange: (n) => onChange(n, "rows"),
                    active: activeLevel.rows,
                  },
                  {
                    title: "COLUMNS",
                    list: ArrMaker(5, 7),
                    onChange: (n) => onChange(n, "columns"),
                    active: activeLevel.columns,
                  },
                  {
                    title: "MINESWEEPERS",
                    list: ArrMaker(46, 18),
                    onChange: (n) => onChange(n, "minesweepers"),
                    active: activeLevel.minesweepers,
                  },
                ],
              }}
            />
            <Animated.View style={[Styles.fw, { height: 75 }, center]}>
              <BUTTON
                {...{
                  style: [
                    { padding: 15, backgroundColor: primary },
                    Styles.aic,
                    Styles.br,
                  ],
                  android_ripple,
                  underlayColor: rippleColor,
                  activeOpacity: 1,
                  onPress: start,
                }}
              >
                <Animated.Text style={[{ fontSize: 18, color: "white" }]}>
                  START
                </Animated.Text>
              </BUTTON>
            </Animated.View>
          </Animated.View>
        </ENEX>
      )}
      {IsGameOver && (
        <ENEX>
          <Animated.View style={[styles.modalView, Styles.br]}>
            <Animated.View style={[Styles.fw, { height: 60 }, center]}>
              <Animated.Text style={[{ fontSize: 27, color: "red" }]}>
                Oops...
              </Animated.Text>
            </Animated.View>
            <Animated.View style={[Styles.fw, { height: 60 }, center]}>
              <Animated.Text style={[{ fontSize: 27, color: "red" }]}>
                Game over
              </Animated.Text>
            </Animated.View>
            <Animated.View style={[Styles.fw, { height: 80 }, center]}>
              <BUTTON
                {...{
                  style: [
                    { padding: 9, borderColor: primary },
                    center,
                    Styles.br,
                    Styles.bw,
                  ],
                  underlayColor: rippleColor,
                  android_ripple,
                  onPress: restart,
                }}
              >
                <Animated.Text style={[{ fontSize: 18, color: primary }]}>
                  Restart
                </Animated.Text>
              </BUTTON>
            </Animated.View>
          </Animated.View>
        </ENEX>
      )}
      {IsWin && (
        <ENEX>
          <Animated.View style={[styles.modalView, Styles.br]}>
            <Animated.View style={[Styles.fw, { height: 60 }, center]}>
              <Animated.Text style={[{ fontSize: 27, color: "green" }]}>
                Win
              </Animated.Text>
            </Animated.View>
            <Animated.View style={[Styles.fw, { height: 60 }, center]}>
              <Animated.Text style={[{ fontSize: 27, color: "green" }]}>
                Congratulation
              </Animated.Text>
            </Animated.View>
            <Animated.View style={[Styles.fw, { height: 80 }, center]}>
              <BUTTON
                {...{
                  style: [
                    { padding: 9, backgroundColor: primary },
                    center,
                    Styles.br,
                  ],
                  underlayColor: rippleColor,
                  android_ripple,
                  onPress: restart,
                }}
              >
                <Animated.Text style={[{ fontSize: 18, color: "white" }]}>
                  New Game
                </Animated.Text>
              </BUTTON>
            </Animated.View>
          </Animated.View>
        </ENEX>
      )}
    </Animated.View>
  );
}
let styles = StyleSheet.create({
  main: {
    backgroundColor: "orange",
    width,
    height,
  },
  modalView: {
    width: width * 0.75,
    minHeight: 81,
    backgroundColor: "white",
  },
  modalHeader: {
    height: 75,
    borderBottomWidth: 0.5,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "500",
  },
});
