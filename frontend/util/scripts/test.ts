// Test the backend with test data before implementing into program

async function test_recommendations(auth_code) {
    const r = await fetch("http://127.0.0.1:5000/get_recommendations", {
        method:"POST",
        headers: {"auth": auth_code}
    });
    if (!r.ok) {
      const errorText = await r.text(); // Get the error as text (likely HTML)
      throw new Error(`${r.status} - ${errorText}`);
    }
    const result  = await r.json()
    console.log(result)
}
const auth_code =
  "BQDFJKU_8Zq8m6uKXmwfdGh9qHFVli5WIsc0ONN141fn6yu2xaVJ-R3D_1eZV_MRXQZDqAcxN6PPDW7T7Iq0kMJhMt0kpVsZYlM4zZBtbniTFKn32kZ32HNw-VPNZv6BDhwSDfKLJ2Argf7tbLDIDm1QmOfALM6HKsj2kRCdpuYveYVOGrD0UzNeaKVkEBGwXWEVxmgu714ygJD6JVLiVAwBSV-yK1-92DegiMG_uMME3Vw";
test_recommendations(auth_code)