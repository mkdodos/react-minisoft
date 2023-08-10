export const initialState = [
  {
    id: '1',
    story: 'story1',
    choice: {
      a: '同胞梅里泰萊',
      b: '追隨先知雷比奧達！',
    },
    result: {
      a: {
        describe: '好人！萊比亞達的追隨者認為泰莫利亞王冠就是你戴在頭上的哈哈哈！快來和我們一起喝一杯吧',
        action: '在第三階段中，額外抓一張牌',
      },
      b: {
        describe: '當你說出這些話時，你感覺到這是錯誤的答案。祭司們揮舞拳頭攻擊',
        action: '防禦力提升1級，並在第二階段減少抽1張牌',
      },
    },
  },
  {
    id: '2',
    story: '踩在曾經高聳的石頭上 你注意到廢墟長滿了苔蘚和低矮的荊棘    尖塔精靈們建造了這個地方然後又把它拆掉了',
    choice: {
      a: '為了尊重精靈的記憶而撤退。',
      b: '搜尋廢墟',
    },
    result: {
      a: {
        describe: '雖然精靈們早已離開，但他們捕食人類的陷阱仍然有效。你踩到了板子，觸發了一個隱藏的機制 尖刺球發射出來，擊中你很痛苦，但你設法找到一個安全的地方休息並包紮傷口',
        action: '1-2 將你的 shield 等級降低3級， 在階段3額外抽一張牌  3-4 丟棄你的全部藥水，在階段3額外抽一張牌    5-6 將你的 shield 等級降低1級， 在階段3額外抽一張牌',
      },
      b: {
        describe: '你驚訝地發現有新的腳印 當你抬起頭 看到有一支箭正瞄准你的臉， 當弓箭手鬆開弓弦時，劍已在你手中這場遭遇無法用言語解決，你被迫戰鬥，',
        action: 'result1 act',
      },
    },
  },
  {
    id: '3',
    story: 'story3',
    choice: {
      a: 'a',
      b: 'b',
    },
    result: {
      a: {
        describe: 'result a desc',
        action: 'result a act',
      },
      b: {
        describe: 'result b desc',
        action: 'result b act',
      },
    },
  },
];
