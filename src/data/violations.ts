export interface Violation {
  id: string;
  tenLoi: string;
  nhomLoi: string;
  mucPhatThapNhat: number; // in VNĐ
  mucPhatCaoNhat: number; // in VNĐ
  mucPhatText: string;
  hinhPhatBoSung: string;
  tenVanBan: string;
  dieuKhoanApDung: string;
  moTaThucTe: string;
  loiKhuyenVanMinh: string;
  canCuHinhSu?: string;
  mucDoNghiemTrong: 'Nhe' | 'TrungBinh' | 'NghiemTrong';
}

export const VIOLATION_GROUPS = [
  'Tất cả',
  'Mê tín dị đoan & Bói toán',
  'Lễ hội & Nơi thờ tự',
  'Không gian mạng & Thông tin số',
  'Lợi dụng tín ngưỡng & Trục lợi',
  'Quản lý tiền công đức & Di tích',
  'Quyền tự do tín ngưỡng'
] as const;

export const VIOLATIONS_DATA: Violation[] = [
  {
    id: 'VIOLATION_01',
    tenLoi: 'Tổ chức hoạt động mê tín dị đoan (bói toán, gọi hồn, trừ tà, yểm bùa lấy tiền)',
    nhomLoi: 'Mê tín dị đoan & Bói toán',
    mucPhatThapNhat: 3000000,
    mucPhatCaoNhat: 5000000,
    mucPhatText: '3.000.000 đ – 5.000.000 đ',
    hinhPhatBoSung: 'Buộc nộp lại số lợi bất hợp pháp có được do thực hiện hành vi mê tín dị đoan.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Khoản 2 và Điểm a Khoản 4 Điều 14',
    moTaThucTe: 'Hành vi tự xưng là thầy bói, cô đồng, pháp sư tổ chức xem bói bài, gọi hồn người đã khuất, dâng sao giải hạn, phán số mệnh gây hoang mang lo sợ và thu tiền của người dân.',
    loiKhuyenVanMinh: 'Tín ngưỡng chân chính hướng con người đến điều thiện, bình an tâm hồn. Không nên tin vào các lời phán hoang đường, mê muội tiền mất tật mang. Chỉ tìm đến các cơ sở tín ngưỡng được cấp phép để chiêm bái thanh tịnh.',
    canCuHinhSu: 'Nếu đã bị xử phạt hành chính về hành vi này hoặc đã bị kết án về tội này chưa được xóa án tích mà còn vi phạm, sẽ bị truy cứu Trách nhiệm hình sự theo Điều 320 Bộ luật Hình sự (Tội hành nghề mê tín, dị đoan) với mức phạt tù từ 06 tháng đến 10 năm.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_02',
    tenLoi: 'Cung cấp, chia sẻ thông tin cổ súy hủ tục, mê tín dị đoan trên mạng xã hội',
    nhomLoi: 'Không gian mạng & Thông tin số',
    mucPhatThapNhat: 5000000,
    mucPhatCaoNhat: 10000000,
    mucPhatText: '5.000.000 đ – 10.000.000 đ (cá nhân); 10.000.000 đ – 20.000.000 đ (tổ chức)',
    hinhPhatBoSung: 'Buộc gỡ bỏ thông tin sai sự thật, mê tín dị đoan hoặc vi phạm pháp luật khỏi nền tảng mạng xã hội.',
    tenVanBan: 'Nghị định số 15/2020/NĐ-CP (sửa đổi, bổ sung bởi Nghị định 14/2022/NĐ-CP)',
    dieuKhoanApDung: 'Điểm b Khoản 1 và Khoản 3 Điều 101; Khoản 3 Điều 4',
    moTaThucTe: 'Đăng tải video, livestream TikTok/Facebook/YouTube xem bói online, phán căn quả kiếp trước, buôn bán bùa ngải tình duyên - tài lộc, truyền bá hiện tượng ma quái, hù dọa vận hạn tai ương nhằm câu view hoặc bán vật phẩm phong thủy tâm linh trục lợi.',
    loiKhuyenVanMinh: 'Không chia sẻ, bình luận ủng hộ các video bói toán trên mạng. Chủ động bấm báo cáo (Report) các nội dung cổ súy mê tín dị đoan tới cơ quan quản lý mạng và nền tảng.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_03',
    tenLoi: 'Đốt vàng mã không đúng nơi quy định tại nơi tổ chức lễ hội, di tích lịch sử - văn hóa',
    nhomLoi: 'Lễ hội & Nơi thờ tự',
    mucPhatThapNhat: 200000,
    mucPhatCaoNhat: 500000,
    mucPhatText: '200.000 đ – 500.000 đ',
    hinhPhatBoSung: 'Buộc thu gom tàn tro, khắc phục tình trạng ô nhiễm môi trường và loại trừ nguy cơ cháy nổ.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Điểm a Khoản 1 Điều 14',
    moTaThucTe: 'Tự ý châm lửa đốt tiền vàng mã, ngựa giấy, đồ mã dưới gốc cây cổ thụ, trước cửa đền, bậc thềm điện thờ di tích ngoài khu vực lò hóa vàng được ban quản lý bố trí.',
    loiKhuyenVanMinh: 'Thực hành nếp sống văn minh: hạn chế tối đa việc đốt vàng mã, không đốt hình nhân, xe cộ, nhà lầu bằng giấy mã gây lãng phí và ô nhiễm môi trường. Nếu hóa vàng, bắt buộc thực hiện đúng lò hóa vàng của ban quản lý.',
    mucDoNghiemTrong: 'Nhe'
  },
  {
    id: 'VIOLATION_04',
    tenLoi: 'Không đặt tiền lễ, tiền giọt dầu, tiền công đức đúng nơi quy định (rải tiền lẻ, nhét tiền vào tượng)',
    nhomLoi: 'Lễ hội & Nơi thờ tự',
    mucPhatThapNhat: 200000,
    mucPhatCaoNhat: 500000,
    mucPhatText: '200.000 đ – 500.000 đ',
    hinhPhatBoSung: 'Nhắc nhở công khai, buộc thu gom tiền rải sai quy định và bỏ vào đúng hòm công đức.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Điểm a Khoản 1 Điều 14',
    moTaThucTe: 'Hành vi ném tiền lẻ xuống giếng cổ, hồ nước di tích, gài tiền lẻ vào kẽ tay chân tượng Phật, ban thờ thánh hoặc ném lên nóc kiệu rước trong các dịp lễ hội đầu năm.',
    loiKhuyenVanMinh: 'Tiền công đức thể hiện lòng thành và trách nhiệm tu bổ di tích. Hãy thành kính bỏ tiền lễ trực tiếp vào Hòm công đức của di tích, tuyệt đối không cài tiền vào thân tượng hay vứt rải rác làm mất mỹ quan chốn tôn nghiêm.',
    mucDoNghiemTrong: 'Nhe'
  },
  {
    id: 'VIOLATION_05',
    tenLoi: 'Lợi dụng hoạt động tín ngưỡng, tâm linh để lừa đảo chiếm đoạt tiền hoặc tài sản',
    nhomLoi: 'Lợi dụng tín ngưỡng & Trục lợi',
    mucPhatThapNhat: 2000000,
    mucPhatCaoNhat: 3000000,
    mucPhatText: '2.000.000 đ – 3.000.000 đ (nếu chưa cấu thành tội phạm hình sự)',
    hinhPhatBoSung: 'Tịch thu tang vật, phương tiện vi phạm; Buộc nộp lại toàn bộ số tiền, tài sản chiếm đoạt trái phép; Người nước ngoài có thể bị áp dụng hình thức xử phạt trục xuất.',
    tenVanBan: 'Nghị định số 144/2021/NĐ-CP của Chính phủ về xử phạt VPHC trong lĩnh vực an ninh trật tự',
    dieuKhoanApDung: 'Điểm c Khoản 1 và Khoản 3, Khoản 4 Điều 15',
    moTaThucTe: 'Dựng chuyện người thân gặp đại nạn sát tinh, yêu cầu gia chủ phải chi hàng chục đến hàng trăm triệu đồng để làm đàn lễ giải hạn, cắt duyên âm, chuộc bùa ngải rồi chiếm đoạt tiền bỏ trốn.',
    loiKhuyenVanMinh: 'Các nghi lễ tâm linh không bao giờ đòi hỏi chi phí đắt đỏ phi lý. Khi ai đó yêu cầu chuyển tiền lớn để làm lễ giải xui hoặc đe dọa tai họa tính mạng nếu không cúng, hãy dừng lại ngay và báo cơ quan công an.',
    canCuHinhSu: 'Nếu số tiền chiếm đoạt từ 2.000.000 đ trở lên hoặc dưới 2.000.000 đ nhưng đã bị xử phạt, gây ảnh hưởng xấu tới ANTT, sẽ bị khởi tố Hình sự theo Điều 174 Bộ luật Hình sự (Tội lừa đảo chiếm đoạt tài sản) mức án có thể tới tù chung thân.',
    mucDoNghiemTrong: 'NghiemTrong'
  },
  {
    id: 'VIOLATION_06',
    tenLoi: 'Phục hồi hoặc duy trì phong tục tập quán cổ hủ gây tổn hại sức khỏe, danh dự người khác',
    nhomLoi: 'Lễ hội & Nơi thờ tự',
    mucPhatThapNhat: 3000000,
    mucPhatCaoNhat: 5000000,
    mucPhatText: '3.000.000 đ – 5.000.000 đ',
    hinhPhatBoSung: 'Buộc chấm dứt hành vi, hủy bỏ các hủ tục và phương tiện phục vụ hủ tục.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Khoản 3 Điều 14',
    moTaThucTe: 'Tổ chức các nghi thức hành xác tàn khốc, đánh đập người nghi bị "ma nhập", dùng roi dâu đánh người bệnh để chữa tà ma gây thương tích, tổn hại sức khỏe và tinh thần.',
    loiKhuyenVanMinh: 'Khi có bệnh thể chất hoặc tâm thần, gia đình phải đưa người bệnh đến bệnh viện và cơ sở y tế uy tín. Nghiêm cấm dùng bùa phép đánh đập chữa bệnh thay thế y học hiện đại.',
    mucDoNghiemTrong: 'NghiemTrong'
  },
  {
    id: 'VIOLATION_07',
    tenLoi: 'Đốt vàng mã bừa bãi tại khu dân cư gây nguy cơ cháy nổ, vi phạm an toàn PCCC',
    nhomLoi: 'Mê tín dị đoan & Bói toán',
    mucPhatThapNhat: 1000000,
    mucPhatCaoNhat: 3000000,
    mucPhatText: '1.000.000 đ – 3.000.000 đ',
    hinhPhatBoSung: 'Buộc khắc phục nguy cơ cháy nổ, bồi thường toàn bộ thiệt hại vật chất và tài sản nếu xảy ra cháy lan.',
    tenVanBan: 'Nghị định số 144/2021/NĐ-CP của Chính phủ về xử phạt VPHC trong lĩnh vực PCCC và ANTT',
    dieuKhoanApDung: 'Khoản 2 Điều 35',
    moTaThucTe: 'Đốt thùng giấy vàng mã khổng lồ ngay dưới hành lang chung cư, đốt cạnh cột điện, xe máy hoặc trên vỉa hè lối đi gió to làm tàn lửa bay vào nhà dân gây nguy cơ hỏa hoạn.',
    loiKhuyenVanMinh: 'Tuyệt đối không đốt vàng mã tại hành lang, ban công chung cư hoặc nơi có vật liệu dễ cháy. Hóa vàng phải có thùng tôn có nắp đậy kín, có xô nước phòng hỏa bên cạnh và đợi tàn lửa tắt hẳn mới rời đi.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_08',
    tenLoi: 'Chiếm đoạt, biển thủ hoặc sử dụng sai mục đích tiền công đức, tài trợ di tích tín ngưỡng',
    nhomLoi: 'Quản lý tiền công đức & Di tích',
    mucPhatThapNhat: 10000000,
    mucPhatCaoNhat: 20000000,
    mucPhatText: '10.000.000 đ – 20.000.000 đ (nếu chưa đến mức hình sự)',
    hinhPhatBoSung: 'Buộc nộp lại toàn bộ số tiền đã chiếm đoạt hoặc sử dụng sai mục đích vào quỹ tu bổ di tích.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP & Thông tư số 04/2023/TT-BTC của Bộ Tài chính',
    dieuKhoanApDung: 'Điều 15 Nghị định 38/2021/NĐ-CP; Điều 10 Thông tư 04/2023/TT-BTC',
    moTaThucTe: 'Người quản lý di tích hoặc thành viên ban lễ hội tự ý mở hòm công đức lấy tiền chia nhau, không ghi chép sổ sách, giấu bớt tiền đóng góp tu bổ của du khách thập phương.',
    loiKhuyenVanMinh: 'Cơ sở tín ngưỡng cần mở tài khoản ngân hàng chuyên dụng tiếp nhận tiền công đức, mở hòm công đức định kỳ có biên bản kiểm kê công khai nhiều thành phần chứng kiến theo Thông tư 04/2023/TT-BTC.',
    canCuHinhSu: 'Nếu chiếm giữ trái phép từ 4.000.000 đ trở lên hoặc lạm dụng tín nhiệm chiếm đoạt từ 4.000.000 đ, có thể bị xử lý hình sự theo Điều 175 (Tội lạm dụng tín nhiệm chiếm đoạt tài sản) hoặc Điều 353 (Tội tham ô tài sản).',
    mucDoNghiemTrong: 'NghiemTrong'
  },
  {
    id: 'VIOLATION_09',
    tenLoi: 'Xâm phạm, vẽ bậy, làm hư hại di vật, cổ vật, tượng thờ trong cơ sở tín ngưỡng',
    nhomLoi: 'Lễ hội & Nơi thờ tự',
    mucPhatThapNhat: 30000000,
    mucPhatCaoNhat: 40000000,
    mucPhatText: '30.000.000 đ – 40.000.000 đ',
    hinhPhatBoSung: 'Buộc khôi phục lại tình trạng ban đầu của di vật, cổ vật hoặc bồi thường toàn bộ chi phí phục chế.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Khoản 6 và Khoản 8 Điều 20',
    moTaThucTe: 'Dùng bút xóa, dao khắc tên ngày tháng lên bia đá, chuông đồng, cột gỗ cổ hoặc tự ý xoa đầu rùa đá, ôm vuốt tượng phật làm mòn hư hại hiện vật thờ tự lịch sử.',
    loiKhuyenVanMinh: 'Tôn trọng không gian linh thiêng và di sản cha ông. Không chạm tay vào hiện vật cổ, không viết vẽ bậy, giữ gìn vẻ đẹp tôn nghiêm cho thế hệ mai sau.',
    canCuHinhSu: 'Nếu hành vi hủy hoại hoặc cố ý làm hư hỏng di vật, cổ vật, bảo vật quốc gia có thể bị phạt tù từ 03 năm đến 07 năm theo Điều 345 Bộ luật Hình sự (Tội vi phạm các quy định về bảo vệ và sử dụng di tích lịch sử - văn hóa, danh lam, thắng cảnh).',
    mucDoNghiemTrong: 'NghiemTrong'
  },
  {
    id: 'VIOLATION_10',
    tenLoi: 'Ép buộc, cưỡng bức hoặc ngăn cản người khác thực hiện quyền tự do tín ngưỡng, tôn giáo',
    nhomLoi: 'Quyền tự do tín ngưỡng',
    mucPhatThapNhat: 5000000,
    mucPhatCaoNhat: 10000000,
    mucPhatText: '5.000.000 đ – 10.000.000 đ',
    hinhPhatBoSung: 'Buộc xin lỗi công khai người bị xâm phạm quyền tự do tín ngưỡng, chấm dứt ngay hành vi cản trở.',
    tenVanBan: 'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 & Nghị định số 144/2021/NĐ-CP',
    dieuKhoanApDung: 'Điều 5 Luật Tín ngưỡng, tôn giáo 2016; Điểm c Khoản 3 Điều 7 Nghị định 144/2021/NĐ-CP',
    moTaThucTe: 'Đe dọa, đuổi việc, cấm đoán con cái kết hôn hoặc cô lập xã hội nhằm ép người khác phải cải đạo hoặc bắt buộc theo tín ngưỡng riêng của bản thân.',
    loiKhuyenVanMinh: 'Hiến pháp và Luật pháp Việt Nam bảo đảm quyền tự do tín ngưỡng, tôn giáo của mọi công dân: theo hoặc không theo bất kỳ tín ngưỡng nào. Tôn trọng sự khác biệt và niềm tin của người xung quanh.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_11',
    tenLoi: 'Tự ý in ấn, phát tán sách, bùa chú, tài liệu tuyên truyền mê tín dị đoan trái phép',
    nhomLoi: 'Không gian mạng & Thông tin số',
    mucPhatThapNhat: 10000000,
    mucPhatCaoNhat: 20000000,
    mucPhatText: '10.000.000 đ – 20.000.000 đ',
    hinhPhatBoSung: 'Tịch thu, tiêu hủy toàn bộ xuất bản phẩm, ấn phẩm mê tín dị đoan; buộc nộp lại số lợi bất hợp pháp.',
    tenVanBan: 'Nghị định số 119/2020/NĐ-CP của Chính phủ xử phạt VPHC trong hoạt động báo chí, xuất bản',
    dieuKhoanApDung: 'Điểm a Khoản 3 Điều 24',
    moTaThucTe: 'In lậu và rải tờ rơi tại các hội chùa, bán sách hướng dẫn bùa chú tà thuật, sấm truyền ngày tận thế, các tài liệu ma mị không qua cấp phép xuất bản.',
    loiKhuyenVanMinh: 'Chỉ đọc và tìm hiểu các kinh sách, tài liệu giáo lý được Nhà xuất bản chính thống cấp phép lưu hành. Không tàng trữ, truyền tay hoặc phát tán các loại bùa chú, truyền đơn ma mị.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_12',
    tenLoi: 'Tranh cướp lộc, chen lấn xô đẩy gây náo loạn, mất trật tự công cộng tại lễ hội tín ngưỡng',
    nhomLoi: 'Lễ hội & Nơi thờ tự',
    mucPhatThapNhat: 1000000,
    mucPhatCaoNhat: 2000000,
    mucPhatText: '1.000.000 đ – 2.000.000 đ',
    hinhPhatBoSung: 'Trục xuất khỏi khu vực lễ hội; bồi thường chi phí y tế nếu gây thương tích nhẹ cho du khách khác.',
    tenVanBan: 'Nghị định số 144/2021/NĐ-CP của Chính phủ về xử phạt VPHC trong lĩnh vực ANTT',
    dieuKhoanApDung: 'Điểm a Khoản 2 Điều 7',
    moTaThucTe: 'Dẫm đạp lên nhau, lao vào cướp hoa tre, cướp quả phết, trèo lên kiệu rước đền chùa để giật lộc làm ngã người già, trẻ em và gây náo loạn không gian trang nghiêm.',
    loiKhuyenVanMinh: 'Lộc xuất phát từ tâm đức và sự cung kính, không nằm ở việc cướp giật. Xếp hàng văn minh, nhường nhịn người già và trẻ nhỏ khi tham dự lễ hội.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_13',
    tenLoi: 'Tổ chức cờ bạc, xóc đĩa, quay số đỏ đen trá hình tâm linh tại khuôn viên lễ hội',
    nhomLoi: 'Lợi dụng tín ngưỡng & Trục lợi',
    mucPhatThapNhat: 10000000,
    mucPhatCaoNhat: 20000000,
    mucPhatText: '10.000.000 đ – 20.000.000 đ',
    hinhPhatBoSung: 'Tịch thu tang vật, tiền bạc, phương tiện đánh bạc; Buộc nộp lại toàn bộ số lợi bất hợp pháp.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP & Nghị định số 144/2021/NĐ-CP',
    dieuKhoanApDung: 'Khoản 4 Điều 14 Nghị định 38/2021/NĐ-CP; Điều 28 Nghị định 144/2021/NĐ-CP',
    moTaThucTe: 'Mượn danh nghĩa "xin thẻ lộc may mắn đầu năm", "bốc quẻ trúng thưởng" để dụ dỗ du khách đặt cược tiền sát phạt đỏ đen tại các lều quán quanh lễ hội di tích.',
    loiKhuyenVanMinh: 'Cảnh giác không tham gia các trò chơi cá cược, trò đỏ đen quanh đền chùa. Không để các đối tượng cờ bạc lừa gạt tiền bạc chốn tâm linh.',
    canCuHinhSu: 'Nếu số tiền, hiện vật dùng để đánh bạc trị giá từ 5.000.000 đ trở lên, sẽ bị truy cứu hình sự theo Điều 321 (Tội đánh bạc) và Điều 322 (Tội tổ chức đánh bạc) Bộ luật Hình sự.',
    mucDoNghiemTrong: 'NghiemTrong'
  },
  {
    id: 'VIOLATION_14',
    tenLoi: 'Lập bàn hành nghề xem bói, tướng số, tử vi thu tiền ngay tại cổng đền, chùa, nơi công cộng',
    nhomLoi: 'Mê tín dị đoan & Bói toán',
    mucPhatThapNhat: 3000000,
    mucPhatCaoNhat: 5000000,
    mucPhatText: '3.000.000 đ – 5.000.000 đ',
    hinhPhatBoSung: 'Buộc dỡ bỏ bàn ghế, tịch thu bài tây, sách bói toán, buộc nộp lại toàn bộ tiền đã thu của khách.',
    tenVanBan: 'Nghị định số 38/2021/NĐ-CP của Chính phủ quy định xử phạt VPHC trong lĩnh vực văn hóa và quảng cáo',
    dieuKhoanApDung: 'Điểm đ Khoản 2 và Điểm a Khoản 4 Điều 14',
    moTaThucTe: 'Kê bàn ghế trước cổng đền chùa chèo kéo khách hành hương xem tay, xem tướng mạo, bói bài tarot, bói chỉ tay rồi đòi tiền lễ từ vài chục đến hàng trăm ngàn đồng.',
    loiKhuyenVanMinh: 'Du khách kiên quyết từ chối các lời mời gọi xem bói dạo. Phản ánh ngay cho Ban quản lý di tích hoặc lực lượng công an thường trực tại lễ hội để dẹp bỏ.',
    mucDoNghiemTrong: 'TrungBinh'
  },
  {
    id: 'VIOLATION_15',
    tenLoi: 'Tự ý lập cơ sở tín ngưỡng trái phép hoặc tổ chức sinh hoạt tín ngưỡng ngoài địa điểm quy định',
    nhomLoi: 'Quyền tự do tín ngưỡng',
    mucPhatThapNhat: 5000000,
    mucPhatCaoNhat: 10000000,
    mucPhatText: '5.000.000 đ – 10.000.000 đ',
    hinhPhatBoSung: 'Đình chỉ ngay hoạt động tín ngưỡng trái phép; buộc tháo dỡ công trình xây dựng trái phép trên đất công.',
    tenVanBan: 'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 & Quy định quản lý đất đai, xây dựng',
    dieuKhoanApDung: 'Khoản 5 Điều 5; Điều 6 và Điều 64 Luật Tín ngưỡng, tôn giáo 2016',
    moTaThucTe: 'Tự ý biến nhà riêng hoặc chiếm dụng đất rừng, đất di tích để xây miếu mạo trái phép, tụ tập đông người hành lễ xưng danh thần thánh gây xáo trộn an ninh trật tự địa phương.',
    loiKhuyenVanMinh: 'Việc lập cơ sở thờ tự tín ngưỡng, tôn giáo phải tuân thủ nghiêm ngặt quy hoạch sử dụng đất và được sự phê duyệt của Ủy ban nhân dân có thẩm quyền.',
    mucDoNghiemTrong: 'NghiemTrong'
  }
];

export const REFERENCE_DOCUMENTS = [
  {
    id: 'LUAT_TNTG_2016',
    ten: 'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14',
    coQuanBanHanh: 'Quốc hội nước CHXHCN Việt Nam',
    ngayBanHanh: '18/11/2016',
    hieuLuc: 'Có hiệu lực từ 01/01/2018',
    phamVi: 'Quy định quyền tự do tín ngưỡng, tôn giáo; hoạt động tín ngưỡng, tôn giáo; tổ chức tôn giáo; quyền và nghĩa vụ của cơ quan, tổ chức, cá nhân có liên quan.',
    dieuKhoanTrongYeu: 'Điều 5 (Các hành vi bị nghiêm cấm: lợi dụng tín ngưỡng tôn giáo để xâm phạm an ninh quốc gia, trục lợi, ép buộc); Điều 6 (Quyền tự do tín ngưỡng); Điều 11 - 15 (Hoạt động tín ngưỡng).'
  },
  {
    id: 'ND_38_2021',
    ten: 'Nghị định số 38/2021/NĐ-CP',
    coQuanBanHanh: 'Chính phủ',
    ngayBanHanh: '29/03/2021',
    hieuLuc: 'Có hiệu lực từ 01/06/2021 (được sửa đổi bổ sung bởi Nghị định 128/2022/NĐ-CP)',
    phamVi: 'Quy định xử phạt vi phạm hành chính trong lĩnh vực văn hóa và quảng cáo.',
    dieuKhoanTrongYeu: 'Điều 14 (Vi phạm quy định về nếp sống văn minh: hoạt động mê tín dị đoan, đốt vàng mã, rải tiền lẻ, phục hồi hủ tục); Điều 15 (Vi phạm về tổ chức lễ hội); Điều 20 (Vi phạm bảo vệ di sản văn hóa, di tích).'
  },
  {
    id: 'ND_144_2021',
    ten: 'Nghị định số 144/2021/NĐ-CP',
    coQuanBanHanh: 'Chính phủ',
    ngayBanHanh: '31/12/2021',
    hieuLuc: 'Có hiệu lực từ 01/01/2022',
    phamVi: 'Quy định xử phạt VPHC trong lĩnh vực an ninh, trật tự, an toàn xã hội; phòng chống tệ nạn xã hội; phòng cháy và chữa cháy; cứu nạn, cứu hộ.',
    dieuKhoanTrongYeu: 'Điều 7 (Gây mất trật tự công cộng tại lễ hội); Điều 15 (Lợi dụng tín ngưỡng lừa đảo chiếm đoạt tài sản); Điều 28 (Hành vi đánh bạc trá hình); Điều 35 (Vi phạm an toàn PCCC khi đốt vàng mã).'
  },
  {
    id: 'ND_15_2020',
    ten: 'Nghị định số 15/2020/NĐ-CP',
    coQuanBanHanh: 'Chính phủ',
    ngayBanHanh: '03/02/2020',
    hieuLuc: 'Sửa đổi, bổ sung bởi Nghị định 14/2022/NĐ-CP',
    phamVi: 'Quy định xử phạt VPHC trong lĩnh vực bưu chính, viễn thông, tần số vô tuyến điện, CNTT và giao dịch điện tử.',
    dieuKhoanTrongYeu: 'Điều 101 (Vi phạm các quy định về trách nhiệm sử dụng dịch vụ mạng xã hội: cung cấp, chia sẻ thông tin cổ súy hủ tục, mê tín dị đoan trên mạng).'
  },
  {
    id: 'BLHS_2015',
    ten: 'Bộ luật Hình sự số 100/2015/QH13 (sửa đổi, bổ sung số 12/2017/QH14)',
    coQuanBanHanh: 'Quốc hội nước CHXHCN Việt Nam',
    ngayBanHanh: '27/11/2015',
    hieuLuc: 'Có hiệu lực từ 01/01/2018',
    phamVi: 'Xử lý các tội phạm hình sự nguy hiểm.',
    dieuKhoanTrongYeu: 'Điều 320 (Tội hành nghề mê tín, dị đoan - phạt tù từ 06 tháng đến 10 năm); Điều 174 (Tội lừa đảo chiếm đoạt tài sản); Điều 345 (Tội vi phạm quy định bảo vệ di tích, danh lam thắng cảnh).'
  },
  {
    id: 'TT_04_2023',
    ten: 'Thông tư số 04/2023/TT-BTC',
    coQuanBanHanh: 'Bộ Tài chính',
    ngayBanHanh: '19/01/2023',
    hieuLuc: 'Có hiệu lực từ 19/03/2023',
    phamVi: 'Hướng dẫn quản lý, thu chi tài chính cho công tác tổ chức lễ hội và tiền công đức, tài trợ cho di tích và hoạt động lễ hội.',
    dieuKhoanTrongYeu: 'Quy định minh bạch mở hòm công đức, ghi chép sổ sách kế toán, cấm cá nhân tự ý chiếm giữ tiền công đức của cơ sở tín ngưỡng di tích.'
  },
  {
    id: 'ND_119_2020',
    ten: 'Nghị định số 119/2020/NĐ-CP',
    coQuanBanHanh: 'Chính phủ',
    ngayBanHanh: '07/10/2020',
    hieuLuc: 'Có hiệu lực từ 01/12/2020',
    phamVi: 'Xử phạt vi phạm hành chính trong hoạt động báo chí, hoạt động xuất bản.',
    dieuKhoanTrongYeu: 'Điều 24 (Hành vi phát tán, in ấn ấn phẩm có nội dung mê tín dị đoan, trái thuần phong mỹ tục).'
  }
];
