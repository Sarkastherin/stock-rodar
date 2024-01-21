const SrcArea = 'AREAS!A1:ZZZ'
class Area {
    static async getAreas() {
        let area;
        try {
            let response = await ApiGoogleSheet.getResponse(SrcArea);
            if (response.status === 200) {
                area = response.result.values;
                area = arrayToObject(area);
              }
              return area;
        } catch (e) {
          console.log(e);
        }
    }
}