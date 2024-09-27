import { convertToSongProperties } from "@/frontend/util/scripts/convertToSongProperties";

test("Test Song Properties function", () => {
  expect(convertToSongProperties(150, 90, "2", 85, new Date(), new Date(3478247238974), false)).toBe(500);
});
