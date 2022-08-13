import {
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import {
  noop,
  isEqual,
  isEmpty,
  chunk,
  min,
  max,
  isFunction,
  gte,
  lte,
} from "lodash";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  runOnJS,
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Svg, { G, Path, Rect, Text, TSpan } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export let { OS } = Platform;
export let isAndroid = isEqual(OS, "android");
export let BUTTON = isAndroid ? Pressable : TouchableHighlight;
export let { width, height } = Dimensions.get("screen");
export let gameBtnSquareSize = 36;
export let rippleColor = "rgba(0,0,0,0.45)";
export let tr = "transparent";
export let primary = "#007aff";
export let android_ripple = {
  foreground: true,
  color: rippleColor,
  radius: 1000,
  borderless: true,
};
export let duration = {
  duration: 750,
};
export let clamp = (value = 0, lower = 0, uppper = 0) => {
  "worklet";
  return max([min([value, uppper]), lower]);
};
export let ArrMaker = (length = 4, extra = 4) =>
  Array(length)
    .fill()
    .map((_, i) => i + extra);
export let Styles = StyleSheet.create({
  jcc: {
    justifyContent: "center",
  },
  jcse: {
    justifyContent: "space-evenly",
  },
  jcsb: {
    justifyContent: "space-between",
  },
  jcsa: {
    justifyContent: "space-around",
  },
  jcfs: {
    justifyContent: "flex-start",
  },
  jcfe: {
    justifyContent: "flex-end",
  },
  aic: {
    alignItems: "center",
  },
  aifs: {
    alignItems: "flex-start",
  },
  aife: {
    alignItems: "flex-end",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  bw: {
    borderWidth: 0.5,
  },
  fw: {
    width: "100%",
  },
  fh: {
    height: "100%",
  },
  br: {
    borderRadius: gameBtnSquareSize / 4,
  },
  f1: {
    flex: 1,
  },
  oh: {
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    zIndex: 1,
  },
  bghw: {
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  header: {
    width,
    height: 69,
  },
  rowyHeaderItem: {
    width: width / 3.2,
    height: 63,
    paddingHorizontal: 12,
    backgroundColor: "black",
  },
  size: {
    fontSize: 21,
  },
  evenHidedBg: {
    backgroundColor: "rgba(0,0,0,0.27)",
  },
  oddHidedBg: {
    backgroundColor: "rgba(255,255,255,0.27)",
  },
  selectBoxText: {
    fontSize: 19.5,
  },
  radioSelectBox: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    borderWidth: 1.5,
  },
  radioSelectBoxInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: primary,
  },
  verticalSliderItem: {
    width: 36,
    height: 36,
  },
  verticalSliderItemText: {
    fontSize: 21,
    color: primary,
  },
  // gameView
});
export let center = [Styles.jcc, Styles.aic];
export let rowy = [Styles.row, Styles.aic];
export let full = [Styles.fw, Styles.fh];

export let ClockZero = () => (
  <Svg width={20} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M5 0 3 2l3 3h8l3-3-2-2zM5 30l-2 2 3 3h8l3-3-2-2zM19.5 4.5l-2-2-3 3v8l3 3 2-2zM19.5 19.5l-2-2-3 3v8l3 3 2-2zM.5 4.5l2-2 3 3v8l-3 3-2-2zM.5 19.5l2-2 3 3v8l-3 3-2-2z" />
    </G>
  </Svg>
);
export let ClockOne = () => (
  <Svg width={6} height={30} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="m5.5 2.5-2-2-3 3v8l3 3 2-2zM5.5 17.5l-2-2-3 3v8l3 3 2-2z" />
    </G>
  </Svg>
);
export let ClockTwo = () => (
  <Svg width={20} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M5 0 3 2l3 3h8l3-3-2-2zM5 30l-2 2 3 3h8l3-3-2-2zM19.5 4.5l-2-2-3 3v8l3 3 2-2zM.5 19.5l2-2 3 3v8l-3 3-2-2zM5 19h10l2-2-2-2H5l-2 2z" />
    </G>
  </Svg>
);
export let ClockThree = () => (
  <Svg width={17} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M2 0 0 2l3 3h8l3-3-2-2zM2 30l-2 2 3 3h8l3-3-2-2zM16.5 4.5l-2-2-3 3v8l3 3 2-2zM16.5 19.5l-2-2-3 3v8l3 3 2-2zM2 19h10l2-2-2-2H2l-2 2z" />
    </G>
  </Svg>
);
export let ClockFour = () => (
  <Svg width={20} height={30} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="m19.5 2.5-2-2-3 3v8l3 3 2-2zM19.5 17.5l-2-2-3 3v8l3 3 2-2zM.5 2.5l2-2 3 3v8l-3 3-2-2zM5 17h10l2-2-2-2H5l-2 2z" />
    </G>
  </Svg>
);
export let ClockFive = () => (
  <Svg width={20} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M5 0 3 2l3 3h8l3-3-2-2zM5 30l-2 2 3 3h8l3-3-2-2zM19.5 19.5l-2-2-3 3v8l3 3 2-2zM.5 4.5l2-2 3 3v8l-3 3-2-2zM5 19h10l2-2-2-2H5l-2 2z" />
    </G>
  </Svg>
);
export let ClockSix = () => (
  <Svg width={20} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M5 0 3 2l3 3h8l3-3-2-2zM5 30l-2 2 3 3h8l3-3-2-2zM19.5 19.5l-2-2-3 3v8l3 3 2-2zM.5 4.5l2-2 3 3v8l-3 3-2-2zM.5 19.5l2-2 3 3v8l-3 3-2-2zM5 19h10l2-2-2-2H5l-2 2z" />
    </G>
  </Svg>
);
export let ClockSeven = () => (
  <Svg width={17} height={32} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="m2.5 0-2 2 3 3h8l3-3-2-2zM17 4.5l-2-2-3 3v8l3 3 2-2zM17 19.5l-2-2-3 3v8l3 3 2-2z" />
    </G>
  </Svg>
);
export let ClockEight = () => (
  <Svg width={19} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="m4.5 0-2 2 3 3h8l3-3-2-2zM4.5 30l-2 2 3 3h8l3-3-2-2zM19 4.5l-2-2-3 3v8l3 3 2-2zM19 19.5l-2-2-3 3v8l3 3 2-2zM0 4.5l2-2 3 3v8l-3 3-2-2zM0 19.5l2-2 3 3v8l-3 3-2-2zM4.5 19h10l2-2-2-2h-10l-2 2z" />
    </G>
  </Svg>
);
export let ClockNine = () => (
  <Svg width={20} height={35} xmlns="http://www.w3.org/2000/svg">
    <G fill="#0FF000" fillRule="evenodd">
      <Path d="M5 0 3 2l3 3h8l3-3-2-2zM5 30l-2 2 3 3h8l3-3-2-2zM19.5 4.5l-2-2-3 3v8l3 3 2-2zM19.5 19.5l-2-2-3 3v8l3 3 2-2zM.5 4.5l2-2 3 3v8l-3 3-2-2zM5 19h10l2-2-2-2H5l-2 2z" />
    </G>
  </Svg>
);
export let ClockNumbers = {
  0: ClockZero,
  1: ClockOne,
  2: ClockTwo,
  3: ClockThree,
  4: ClockFour,
  5: ClockFive,
  6: ClockSix,
  7: ClockSeven,
  8: ClockEight,
  9: ClockNine,
};

export let GameNumber = ({ color, num }) => (
  <Svg width={36} height={36} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill="none" width={36} height={36} rx={12} />
      <Text
        fontFamily="Helvetica"
        fontSize={24}
        letterSpacing={1.6}
        fill={color}
      >
        <TSpan x={10.526} y={26.4}>
          {num}
        </TSpan>
      </Text>
    </G>
  </Svg>
);
export let GameNumbers = {
  1: <GameNumber color="#0000FF" num={1} />,
  2: <GameNumber color="#017601" num={2} />,
  3: <GameNumber color="#FF0000" num={3} />,
  4: <GameNumber color="#800080" num={4} />,
  5: <GameNumber color="#800000" num={5} />,
  6: <GameNumber color="#40E0D0" num={6} />,
  7: <GameNumber color="#000000" num={7} />,
  8: <GameNumber color="#808080" num={8} />,
};
export let Minesweeper = () => (
  <MaterialCommunityIcons
    {...{
      name: "mine",
      size: 39,
      color: "gray",
    }}
  />
);
export let TimerIc = () => (
  <Ionicons
    {...{
      name: "ios-timer-outline",
      size: 39,
      color: "gray",
    }}
  />
);

export let ENEX = ({
  children,
  isOverlayed = true,
  isHaveVerticalPadding = false,
}) => {
  let insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={[
        full,
        isOverlayed && [
          Styles.overlay,
          { backgroundColor: rippleColor },
          center,
        ],
        isHaveVerticalPadding && { paddingVertical: insets.top },
      ]}
      entering={FadeInUp.duration(600)}
      exiting={FadeOutDown}
    >
      {children}
    </Animated.View>
  );
};
export let RowyHeaderItem = ({ Icon, Num }) => {
  let strNum = `${Num}`;
  let numsArr = strNum.split("");
  return (
    <Animated.View
      style={[Styles.rowyHeaderItem, Styles.br, rowy, Styles.bw, Styles.jcsb]}
    >
      <Icon />
      <Animated.View style={[center, Styles.row]}>
        {numsArr.map((n, i) => {
          let N = ClockNumbers[n];
          return (
            <Animated.View key={i} style={{ marginHorizontal: 3 }}>
              <N />
            </Animated.View>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};
export let Header = ({ items = [] }) => {
  return (
    <Animated.View
      style={[Styles.header, rowy, Styles.jcse]}
      entering={SlideInUp.duration(400)}
      exiting={SlideOutUp.duration(400)}
    >
      {items.map((item, i) => (
        <RowyHeaderItem
          {...{
            key: i,
            ...item,
          }}
        />
      ))}
    </Animated.View>
  );
};
export let SelectBox = ({
  text,
  rows,
  columns,
  isSelected = false,
  onPress = noop,
}) => {
  let activeText = { fontSize: 21, color: isSelected ? primary : "black" };
  return (
    <BUTTON
      {...{
        style: [
          {
            width: width * 0.36,
            height: 90,
            borderColor: isSelected ? primary : tr,
          },
          Styles.br,
          Styles.aic,
          Styles.jcse,
        ],
        onPress,
        activeOpacity: 1,
        underlayColor: rippleColor,
        android_ripple,
      }}
    >
      <>
        <Animated.View style={[Styles.fw, Styles.jcse, Styles.aic, Styles.row]}>
          <Animated.Text style={[activeText]}>{text}</Animated.Text>
          <Animated.Text style={[activeText]}>
            {rows} x {columns}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            Styles.radioSelectBox,
            { borderColor: isSelected ? primary : "black" },
            center,
          ]}
        >
          {isSelected && (
            <Animated.View
              style={[Styles.radioSelectBoxInner]}
              entering={FadeIn}
              exiting={FadeOut}
            />
          )}
        </Animated.View>
      </>
    </BUTTON>
  );
};
export let SelectBoxGroup = ({ list = [], onBoxPress = noop }) => {
  return (
    <Animated.View style={[Styles.fw]}>
      {chunk(list, 2).map((ROW, i) => {
        return (
          <Animated.View
            key={i}
            style={[Styles.fw, Styles.row, Styles.jcse, { paddingTop: 16 }]}
          >
            {ROW.map((item, j) => {
              let Key = i * 2 + j;
              return (
                <SelectBox
                  {...{
                    key: Key,
                    onPress: () => onBoxPress(Key),
                    ...item,
                  }}
                />
              );
            })}
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export let BombMaker = ({ minesweepers = 10, table = 20 }) => {
  let bombs = [],
    c = 0;
  while (c !== minesweepers) {
    let num = Math.floor(Math.random() * table);
    if (!bombs.includes(num)) {
      bombs.push(num);
      c++;
    }
  }
  return bombs;
};
let arrows = (i = 0, j = 0) => isEqual(Math.abs(i - j), 1);
let RemoveDups = (arr = []) => {
  let ac = arr,
    res = [];
  while (!isEmpty(ac)) {
    let f = ac[0];
    res.push(f);
    ac = ac.filter((a) => !isEqual(a, f));
  }
  return res;
};
let Remove = (arr = [], e) => arr.filter((a) => !isEqual(a, e));
let RemoveEmpties = (arr = []) => arr.filter((a) => !isEmpty(a));
export let EmptyNeighboures = ({ tjcd = [[0]], rows = 10, columns = 10 }) => {
  let zeros = [];
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < columns; j++)
      if (tjcd[i][j]?.isEmpty) zeros.push({ i, j });
  // console.log(zeros);
  zeros = zeros.sort((a, b) => a.i - b.i);
  let copy = [...zeros];
  let res = [];
  while (!isEmpty(copy)) {
    let f = copy[0];
    let g = [f];
    for (let g0 of g) {
      for (let item of copy)
        if (
          (isEqual(g0.j, item.j) && arrows(g0.i, item.i)) ||
          (isEqual(g0.i, item.i) && arrows(g0.j, item.j))
        ) {
          g.push(item);
          copy = Remove(copy, item);
        }
    }
    res.push(RemoveEmpties(RemoveDups(g)));
    copy = Remove(copy, f);
  }
  let Result = RemoveEmpties(res);
  let JustEmpties = [...Result];
  Result = Result.map((G) => {
    let o = [];
    for (let { i, j } of G)
      for (let k = i - 1; k <= i + 1; k++)
        for (let m = j - 1; m <= j + 1; m++) o.push({ i: k, j: m });
    o = RemoveDups(o);
    o = o.filter(
      ({ i, j }) =>
        gte(i, 0) && lte(i, rows - 1) && gte(j, 0) && lte(j, columns - 1),
    );
    return o;
  });
  // console.log(Result);
  return { Result, JustEmpties };
};
export let Points = ({
  rs = 0,
  re = 0,
  cs = 1,
  ce = 1,
  ChunkedData = [[0]],
  i = 0,
  j = 0,
}) => {
  let bs = 0;
  for (let k = rs; k <= re; k++)
    for (let l = cs; l <= ce; l++) {
      let ndrc = ChunkedData[k][l];
      if (ChunkedData[i][j] !== 9 && ndrc === 9) bs++;
    }
  if (bs !== 0) ChunkedData[i][j] = bs;
  return;
};
export let DataMaker = ({ rows = 4, columns = 4, minesweepers = 4 }) => {
  let data = [];
  let table = rows * columns;
  let Bombs = BombMaker({ minesweepers, table });
  for (let i = 0; i < table; i++) data.push(0);
  for (let bomb of Bombs) data[bomb] = 9;
  let ChunkedData = chunk(data, columns);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let st = { ChunkedData, i, j };
      if (i === 0) {
        let sst = { ...st, rs: i, re: i + 1 };
        if (j === 0) Points({ ...sst, cs: j, ce: j + 1 });
        else if (j === columns - 1) Points({ ...sst, cs: j - 1, ce: j });
        else Points({ ...sst, cs: j - 1, ce: j + 1 });
      } else if (i === rows - 1) {
        let sst = { ...st, rs: i - 1, re: i };
        if (j === 0) Points({ ...sst, cs: j, ce: j + 1 });
        else if (j === columns - 1) Points({ ...sst, cs: j - 1, ce: j });
        else Points({ ...sst, cs: j - 1, ce: j + 1 });
      } else {
        let sst = { ...st, rs: i - 1, re: i + 1 };
        if (j === 0) Points({ ...sst, cs: j, ce: j + 1 });
        else if (j === columns - 1) Points({ ...sst, cs: j - 1, ce: j });
        else Points({ ...sst, cs: j - 1, ce: j + 1 });
      }
    }
  }
  /**
   * toJson ChunkedData
   */
  let tjcd = ChunkedData.map((r) =>
    r.map((num) => {
      let isBomb = num === 9;
      let isEmpty = num === 0;
      return {
        isBomb,
        isEmpty,
        isNum: !isBomb && !isEmpty,
        num,
      };
    }),
  );
  let DataForRender = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // let ij = i * columns + j;
      DataForRender.push(tjcd[i][j]);
    }
  }
  // console.log(DataForRender);
  let en = EmptyNeighboures({ tjcd, rows, columns });
  // console.log({
  //   Result,
  //   JustEmpties,
  // });
  return {
    DataForRender,
    ...en,
  };
};
export let GameBtn = ({ onPress, onLongPress, item, isOdd = false }) => {
  return (
    <BUTTON
      {...{
        style: [
          {
            width: gameBtnSquareSize,
            height: gameBtnSquareSize,
          },
          center,
        ],
        activeOpacity: 1,
        underlayColor: rippleColor,
        android_ripple,
        onPress: item?.isFlagged ? noop : onPress,
        onLongPress,
        disabled: !item?.isHide,
      }}
    >
      <>
        {item?.isHide ? (
          <Animated.View
            style={[
              full,
              isOdd ? Styles.oddHidedBg : Styles.evenHidedBg,
              center,
            ]}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            {item?.isFlagged && (
              <Entypo
                {...{
                  name: "flag",
                  size: 27,
                }}
              />
            )}
          </Animated.View>
        ) : item?.isBomb ? (
          <Animated.View style={[full, { transform: [{ scale: 0.75 }] }]}>
            <Minesweeper />
          </Animated.View>
        ) : item?.isNum ? (
          GameNumbers[item?.num ?? "1"]
        ) : null}
      </>
    </BUTTON>
  );
};
export let GameView = ({
  data,
  rows = 6,
  columns = 6,
  GameOver = noop,
  Win = noop,
  setBombsNumber = noop,
}) => {
  let [Data, setData] = useState(
    data?.DataForRender?.map((d) => ({
      ...d,
      isHide: true,
      isFlagged: false,
    })),
  );
  let bombsNumber = Data?.filter(({ isBomb }) => isBomb)?.length;
  let [Bombs, setBombs] = useState(bombsNumber);
  let Width = gameBtnSquareSize * columns;
  let Height = gameBtnSquareSize * rows;
  let onPress = (i = 0, j = 0) => {
    let ij = { i, j };
    let index = i * columns + j;
    let group = [];
    for (let k = 0; k < data?.JustEmpties?.length; k++) {
      let JEK = data?.JustEmpties[k];
      for (let m = 0; m < JEK?.length; m++)
        if (isEqual(ij, JEK[m])) {
          group.push(...data?.Result[k]);
          break;
        }
    }
    let copy = [...Data];
    let item = copy[index];
    item.isHide = false;
    if (!isEmpty(group))
      for (let { i, j } of group) {
        let ij = i * columns + j;
        if (!copy[ij].isFlaged) copy[ij].isHide = false;
      }
    if (item?.isBomb) {
      GameOver();
      for (let item of copy) item.isHide = false;
    }
    setData(copy);
    let unPressedBtns = Data?.filter(({ isHide }) => !isHide)?.length;
    if (isEqual(unPressedBtns, bombsNumber - Bombs)) Win();
  };
  let onLongPress = (index = 0) => {
    let copy = [...Data];
    let item = copy[index];
    let IF = item?.isFlagged;
    item.isFlagged = !IF;
    setData(copy);
    setBombsNumber((b) => b + (IF ? 1 : -1));
    if (item?.isBomb) {
      let nb = Bombs + (IF ? 1 : -1);
      setBombs(nb);
      if (isEqual(nb, 0)) Win();
    }
  };
  return (
    <Animated.View
      style={[
        {
          width,
          height: Height + gameBtnSquareSize / 2,
        },
        center,
      ]}
    >
      <Animated.View
        style={[
          {
            width: Width,
            height: Height,
          },
        ]}
      >
        {chunk(Data, columns).map((ROW, i) => {
          return (
            <Animated.View
              key={i}
              style={[
                Styles.fw,
                {
                  height: gameBtnSquareSize,
                },
                Styles.row,
              ]}
            >
              {ROW.map((item, j) => {
                let Key = i * columns + j;
                return (
                  <GameBtn
                    key={Key}
                    item={item}
                    isOdd={isEqual((i + j) % 2, 0)}
                    onPress={item?.isHide ? () => onPress(i, j) : noop}
                    onLongPress={item?.isHide ? () => onLongPress(Key) : noop}
                  />
                );
              })}
            </Animated.View>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};
export let InputPicker = ({
  list = [],
  Height = 10,
  title,
  onChange,
  active,
}) => {
  let ll = list.length;
  let ItemHeight = 36;
  let ItemHeightH = 18;
  let MIN = -(ll - 2) * ItemHeight;
  let MAX = ItemHeight;
  let ty = useSharedValue(MAX);
  let hty = useSharedValue(MAX);
  let onEnd = (TY = 0) => {
    let res = TY;
    let ind = 0;
    for (let i = 0; i < ll; i++) {
      if (isEqual(i, 0)) {
        if (TY > ItemHeightH) {
          res = MAX;
          ind = 0;
        }
      } else if (isEqual(i, ll - 1)) {
        if (TY < MIN + ItemHeightH) {
          res = MIN;
          ind = ll - 1;
        }
      } else {
        let prev = (i - 1) * ItemHeight - ItemHeightH;
        let next = prev + ItemHeight;
        if (-TY >= prev && -TY < next) {
          res = -(prev + ItemHeightH);
          ind = i;
        }
      }
    }
    ty.value = withTiming(res, duration);
    hty.value = res;
    if (isFunction(onChange)) onChange(list[ind]);
  };
  let pan = Gesture.Pan()
    .onUpdate(({ translationY }) => {
      ty.value = clamp(translationY + hty.value, MIN, MAX);
    })
    .onEnd(() => {
      runOnJS(onEnd)(ty.value);
    });
  let translationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: ty.value,
      },
    ],
  }));
  let OverlayedView = ({ isTop = false }) => (
    <Animated.View
      style={[
        Styles.fw,
        { height: ItemHeight },
        Styles.br,
        Styles.overlay,
        isTop ? { top: 0 } : { bottom: 0 },
        Styles.bghw,
      ]}
    />
  );
  useEffect(() => {
    let diff = list[0] - active;
    let TY = (diff + 1) * ItemHeight;
    ty.value = withTiming(TY, duration);
    hty.value = TY;
  }, [active]);
  return (
    <Animated.View
      style={[
        { paddingHorizontal: 12, height: Height },
        Styles.aic,
        Styles.jcse,
      ]}
    >
      <Animated.Text>{title}</Animated.Text>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[Styles.fw, { height: 3 * ItemHeight }, Styles.oh, Styles.aic]}
        >
          {list.map((num, i) => {
            return (
              <Animated.View
                key={i}
                style={[translationStyle, Styles.verticalSliderItem, center]}
              >
                <Animated.Text style={[Styles.verticalSliderItemText]}>
                  {num}
                </Animated.Text>
              </Animated.View>
            );
          })}
          <OverlayedView isTop />
          <OverlayedView />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
export let InputGroupPicker = ({ inputs = [], isEnabled = false }) => {
  let MaxHeight = 150;
  return (
    <Animated.View
      style={[Styles.fw, { marginVertical: 16, height: MaxHeight }, Styles.oh]}
    >
      <Animated.View style={[full, Styles.row, Styles.aic, Styles.jcse]}>
        {inputs.map((input, i) => {
          return (
            <InputPicker
              {...{
                key: i,
                Height: MaxHeight * 0.9,
                ...input,
              }}
            />
          );
        })}
      </Animated.View>
      {!isEnabled && (
        <Animated.View
          style={[
            full,
            Styles.overlay,
            { backgroundColor: "rgba(0,0,0,0.24)" },
          ]}
          entering={FadeInUp.duration(450)}
          exiting={FadeOutDown.duration(450)}
        />
      )}
    </Animated.View>
  );
};
