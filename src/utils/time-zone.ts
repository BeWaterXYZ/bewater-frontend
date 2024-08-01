export const enZoneCity: any = {
  "-12": "",
  "-11": "",
  "-10": " (Hawaii)",
  "-9": " (Alaska)",
  "-8": " (Los Angeles, San Francisco)",
  "-7": "",
  "-6": " (Chicago)",
  "-5": " (New York City)",
  "-4": "",
  "-3": "",
  "-2": "",
  "-1": "",
  "0": "(London)",
  "1": " (Paris, Milan, Berlin)",
  "2": " (Jerusalem)",
  "3": " (Moscow, Istanbul)",
  "4": " (Dubai)",
  "5": "",
  "6": "",
  "7": " (Bangkok)",
  "8": " (Shanghai, Beijing, Singapore)",
  "9": " (Tokyo, Seoul)",
  "10": " (Sydney, Melbourne)",
  "11": "",
  "12": " (Auckland)",
  "13": "",
  "14": " (Kiritimati)",
};

export const zhZoneCity: any = {
  "-12": "",
  "-11": "",
  "-10": "（夏威夷）",
  "-9": "（阿拉斯加）",
  "-8": "（洛杉矶，旧金山）",
  "-7": "",
  "-6": "（芝加哥）",
  "-5": "（纽约市）",
  "-4": "",
  "-3": "",
  "-2": "",
  "-1": "",
  "0": "（伦敦）",
  "1": "（巴黎，米兰，柏林）",
  "2": "（耶路撒冷）",
  "3": "（莫斯科，伊斯坦布尔）",
  "4": "（迪拜）",
  "5": "",
  "6": "",
  "7": "（曼谷）",
  "8": "（上海，北京，新加坡）",
  "9": "（东京，首尔）",
  "10": "（悉尼，墨尔本）",
  "11": "",
  "12": "（奥克兰）",
  "13": "",
  "14": "（圣诞岛）",
};

const zoneCity: any = {
  "-12": "",
  "-11": "",
  "-10": "Hawaii",
  "-9": "Alaska",
  "-8": "Los Angeles",
  "-7": "",
  "-6": "Chicago",
  "-5": "New York",
  "-4": "",
  "-3": "",
  "-2": "",
  "-1": "",
  "0": "London",
  "1": "Paris",
  "2": "Jerusalem",
  "3": "Moscow",
  "4": "Dubai",
  "5": "",
  "6": "",
  "7": "Bangkok",
  "8": "Shanghai",
  "9": "Tokyo",
  "10": "Sydney",
  "11": "",
  "12": "Auckland",
  "13": "",
  "14": "Kiritimati",
};

export function zoneLiteral(city: boolean) {
  const zone = -Math.floor(new Date().getTimezoneOffset() / 60);
  return (
    "UTC" +
    (zone === 0
      ? city
        ? " " + zoneCity["0"]
        : ""
      : zone > 0
      ? "+" + zone + (city ? " " + zoneCity[`${zone}`] : "")
      : `${zone}` + (city ? " " + zoneCity[`${zone}`] : ""))
  );
}
