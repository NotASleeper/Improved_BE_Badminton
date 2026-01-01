"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "pro_translations",
      [
        {
          productid: 1,
          languagecode: "vi",
          name: "Vợt cầu lông Yonex Nanoflare 700 Pro 2024",
          description:
            "Vợt cầu lông Yonex Nanoflare 700 Pro 2024 là phiên bản nâng cấp của dòng Nanoflare 700, thiên về lối chơi linh hoạt, thiên về phản tạt, điều cầu tốc độ nhanh với độ chính xác cao.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 2,
          languagecode: "vi",
          name: "Vợt cầu lông Yonex Arcsaber 0 Feel",
          description:
            "Vợt cầu lông Yonex Arcsaber 0 Feel là cây vợt thuộc phân khúc giá rẻ của thương hiệu Yonex, với chỉ số cân bằng cùng đũa vợt siêu dẻo cho khả năng hỗ trợ lực, hướng tới đối tượng là những bạn mới chơi yêu thích lối đánh công thủ toàn diện.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 3,
          languagecode: "vi",
          name: "Vợt Cầu Lông Yonex Astrox 88S Pro 2024",
          description:
            "Vợt Cầu Lông Yonex Astrox 88S Pro 2024 là cây vợt thiên về khả năng phản tạt, và kiểm soát. Với điểm cân bằng có thông số 298mm cùng với đũa vợt cứng và ngắn hơn thông thường mang lại khả năng linh hoạt trong các pha cầu, đặc biệt với những pha bắt lưới, phản tạt tốc độ cao.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 4,
          languagecode: "vi",
          name: "Vợt Cầu Lông Lining Axforce 10",
          description:
            "Vợt cầu lông Lining Axforce 10 thuộc phân khúc tầm trung có điểm cân bằng ở mức 295 +-5mm, thiết kế cho lối chơi công thủ toàn diện, hơi thiên công giúp người chơi có những cú đập có thêm độ cắm và uy lực. Đũa vợt cứng ở mức trung bình, không quá khó để người chơi có thể làm quen và kiểm soát.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 5,
          languagecode: "vi",
          name: "Vợt cầu lông Yonex Nanoflare Starbucks",
          description:
            "Vợt cầu lông Yonex Nanoflare Starbucks là sản phẩm kết hợp giữa Yonex và thương hiệu coffee nổi tiếng Starbucks. Mang thiết kế có 2 phiên bản, một màu sắc xanh của thương hiệu cà phê và một phiên bản màu hồng nhẹ nhàng hơn, kết hợp cùng với các chi tiết được làm tỉ mỉ, tạo nên một tổng thể hiện đại và nổi bật. Và vợt đã được đan sẵn lưới rất tiện lợi cho các bạn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 6,
          languagecode: "vi",
          name: "Giày cầu lông Yonex Velo 200",
          description:
            "Giày cầu lông Yonex Velo 200 là một trong những dòng giày cầu lông giá rẻ của nhà Yonex, với sự đa dạng về màu sắc khác nhau thoải mái cho bạn lựa chọn, đặc biệt phù hợp với các bạn học sinh, sinh viên, những người chơi phong trào yêu thích bộ môn cầu lông.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 7,
          languagecode: "vi",
          name: "Giày cầu lông Yonex Power Cushion Comfort Z3 Women",
          description:
            "Giày cầu lông Yonex Power Cushion Comfort Z3 Women là mẫu giày cầu lông cao cấp dành cho người chơi phong trào và chuyên nghiệp muốn tận hưởng sự thoải mái và tối đa tốc độ di chuyển trên sân. Comfort Z3 Women có thiết kế upper mới với mu bàn chân cong với cấu trúc bên trong và bên ngoài không đối xứng. Nó làm giảm nồng độ một phần của áp suất và tạo ra một sự vừa vặn bao bọc toàn bộ phần trên.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 8,
          languagecode: "vi",
          name: "Giày Cầu lông Kawasaki A3310",
          description:
            "Giày cầu lông Kawasaki 3310 là mẫu giày tầm trung được thiết kế đặc biệt cho những người yêu thích môn thể thao cầu lông đảm bảo độ êm ái và tăng tốc độ di chuyển trên sân cầu.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 9,
          languagecode: "vi",
          name: "Giày cầu lông Lining AYAU005-1 chính hãng",
          description:
            "Giày cầu lông chính hãng Lining, kiểu dáng thể thao, độ bền cao, phù hợp người chơi chuyên nghiệp.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 10,
          languagecode: "vi",
          name: "Giày cầu lông Lining AYTU025-3 chính hãng",
          description:
            "Giày cầu lông Lining AYTU025-3 chính hãng sử dụng màu sắc đơn giản và giản dị. Phần trên được làm từ chất liệu thoải mái, dễ chịu và mềm mại, mang lại cảm giác chân tốt. Thiết kế logo thương hiệu Li Ning, tay nghề tỉ mỉ, làm nổi bật sự quyến rũ của thương hiệu. Thiết kế chống va chạm của mũi giày giúp giảm trầy xước hoặc va chạm trên ngón chân và nâng niu từng bước chân.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 11,
          languagecode: "vi",
          name: "Áo cầu lông Yonex RM2890 - Steel Gray chính hãng",
          description:
            "Áo cầu lông chính hãng Yonex, chất liệu co giãn nhẹ, thoáng khí, phù hợp thi đấu hoặc tập luyện.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 12,
          languagecode: "vi",
          name: "Áo cầu lông Yonex A531 Nam - Trắng xanh",
          description:
            "Áo cầu lông Yonex nam thiết kế trẻ trung, màu trắng xanh phối hiện đại, thấm hút mồ hôi tốt.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 13,
          languagecode: "vi",
          name: "Váy cầu lông Lining 9019 - Trắng",
          description:
            "Váy Cầu Lông Lining 9019 - Trắng được làm từ chất liệu cao cấp, mềm mại, co giãn tốt, mang lại cảm giác êm ái cho người chơi. Đặc biệt, váy Lining 9019 được trang bị lớp bảo hộ bên trong giúp các chị em lông thủ tự tin khi vận động",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 14,
          languagecode: "vi",
          name: "Váy cầu lông Lining 9019 - Đen",
          description:
            "Váy Cầu Lông Lining 9019 - Đen được làm từ chất liệu cao cấp, mềm mại, co giãn tốt, mang lại cảm giác êm ái cho người chơi. Đặc biệt, váy Lining 9019 được trang bị lớp bảo hộ bên trong giúp các chị em lông thủ tự tin khi vận động.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 15,
          languagecode: "vi",
          name: "Quần cầu lông Victor 960 - Trắng",
          description:
            "Quần cầu lông Victor 960 - Trắng - Co Dãn Tốt, Thấm Hút Hoàn Hảo, Bền Bỉ Sử Dụng Trong Một Thời Gian Dài",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 16,
          languagecode: "vi",
          name: "Túi cầu lông Yonex 92431 TRM (GC)",
          description:
            "Túi cầu lông Yonex 92431 TRM (GC) được thiết kế chú trọng đến cả phong cách và chức năng. Thiết kế hiện đại đảm bảo bạn nổi bật cả trong và ngoài sân thể thao. Với nhiều ngăn và tùy chọn lưu trữ cho tất cả đồ dùng thể thao của bạn, bao gồm vợt, giày dép, quần áo và phụ kiện, bạn sẽ luôn ngăn nắp và sẵn sàng thi đấu.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 17,
          languagecode: "vi",
          name: "Túi cầu lông Yonex BAG2329T02",
          description:
            "Túi cầu lông Yonex BAG2329T02 có 2 ngăn chính rộng rãi dùng có thể chứa đầy đủ tất cả các loại dụng cụ cần thiết cho một buổi chơi cầu và 1 ngăn được thiết kế ở bên mặt túi giúp chứa các phụ kiện để dễ dàng lấy sử dụng nhanh, ngoài ra còn có 1 ngăn đựng giày được tích hợp với túi giúp người chơi có thể để giày riêng biệt, đảm bảo vệ sinh và vô cùng tiện lợi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 18,
          languagecode: "vi",
          name: "Túi Đựng Giày Kamito Cool KMTUI230260 - Cam",
          description:
            "Kamito Cool KMTUI230260 với những họa tiết logo Kamito được cách điệu đầy nghệ thuật, đan xen những tông màu ngẫu hứng, đặc biệt phù hợp với giới trẻ năng động, tràn đầy nhiệt huyết.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 19,
          languagecode: "vi",
          name: "Túi cầu lông Yonex 83031 (GC)",
          description:
            "Túi cầu lông Yonex 83031 là một dòng sản phẩm đa năng với không gian chứa đồ lớn nhưng gọn nhẹ, không cồng kềnh và giúp bạn di chuyển dễ dàng hơn so với các loại túi đựng vợt thông thường khác, với 4 phiên bản màu sắc khác nhau để các bạn lựa chọn màu mình yêu thích: trắng xanh than, trắng xanh lá, trắng tím và trắng xanh ngọc.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 20,
          languagecode: "vi",
          name: "Balo Cầu Lông Yonex BAG524B0712Z",
          description:
            "Balo Cầu Lông Yonex BAG524B0712Z là một trong những mẫu balo đẹp, chất lượng và vô cùng tiện lợi đến từ thương hiệu Yonex. Chất liệu của balo được sử dụng là vải Polyester bền bỉ, có khả năng chống bám bụi bẩn và chống thấm nước. Yonex BAG524B0712Z có 4 phiên bản màu sắc khác nhau, tha hồ cho các bạn lựa chọn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 21,
          languagecode: "vi",
          name: "Ống cầu lông Victor Doraemon NCS_DRM M - Xanh",
          description:
            "Ống cầu lông nhựa Victor Doraemon NCS_DRM M - Xanh với vỏ hộp được thiết kế lấy hình ảnh chú mèo máy dễ thương Doraemon, sản phẩm đánh dấu sự hợp tác giữa thương hiệu Victor và bộ phim hoạt hình nổi tiếng đến từ Nhật Bản.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 22,
          languagecode: "vi",
          name: "Ống cầu lông Hải Yến S70",
          description:
            "Ống cầu lông chất lượng Hải Yến S70 là sản phẩm chất lượng cao, sản xuất trên dây chuyền tự động chiếm trên 80% theo tiêu chuẩn của liên đoàn cầu lông thế giới BWF với phương châm không ngừng đổi mới và cải tiến.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 23,
          languagecode: "vi",
          name: "Ống cầu lông 88",
          description:
            "Ống cầu lông cao cấp 88 là sản phẩm chất lượng cao hoàn toàn được làm từ nguyên liệu lông tự nhiên, sản xuất trên dây chuyền tự động chiếm trên 80%, theo tiêu chuẩn của liên đoàn cầu lông thế giới BWF với phương châm không ngừng đổi mới và cải tiến.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 24,
          languagecode: "vi",
          name: "Ống cầu lông Hải Anh Pro",
          description:
            "Ống cầu lông Hải Anh Pro là loại cầu đạt tiêu chuẩn trong thi đấu với thiết kế 16 cánh lông tự nhiên được phân bổ đều xung quang đế, gia công cắm theo hình rẻ quạt cho quỹ đạo xoay tròn giúp tạo ra độ ổn định và đầm khi bay, hạn chế tối đa vấn đề rung lắc hay bị xoáy trong lúc bay.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 25,
          languagecode: "vi",
          name: "Ống cầu lông Yonex AS30",
          description:
            "YONEX AEROSENSA 30 là quả cầu lông chính thức của các giải đấu quốc tế hàng đầu thế giới. Công nghệ được chế tạo chính xác trong mỗi quả cầu lông vũ YONEX đều được kiểm tra và thử nghiệm rộng rãi để đảm bảo đồng nhất 100 quả như 1.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 26,
          languagecode: "vi",
          name: "Dây Cước Căng Vợt Yonex BG 9",
          description:
            "Dây Cước Căng Vợt Yonex BG 9 là một lựa chọn tuyệt vời cho người chơi cầu lông ở mọi trình độ. Với sự cấu tạo đa sợi nylon chịu lực cao giúp đem đến khả năng hỗ trợ lực và khả năng hấp thụ sốc tốt, âm thanh mang lại khi đánh cũng vang và đanh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 27,
          languagecode: "vi",
          name: "Dây cước căng vợt Felet RigCore 61",
          description:
            "Dây cước căng vợt Felet RigCore 61 được thiết kế với độ trợ lực tốt, âm thanh và độ đàn hồi cao để mang lại hiệu suất tối ưu cho người chơi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 28,
          languagecode: "vi",
          name: "Dây cước căng vợt Lining L9",
          description:
            "Dây cước căng vợt Lining L9 là loại dây cước được làm từ chất liệu nylon polymer với độ dày 0.75mm. Dây cước có độ bền cao, chống đứt tốt, phù hợp cho những người chơi thường xuyên đánh cầu. Với tiêu chí giá thành rất rẻ và bền, phù hợp với túi tiền của đa số người chơi cầu lông. Đây là một lựa chọn tiết kiệm cho những người mới chơi hoặc những người chơi không muốn đầu tư quá nhiều vào dây cước.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 29,
          languagecode: "vi",
          name: "Vợt PickleBall Head Extreme Elite 2023 chính hãng",
          description:
            "Vợt PickleBall Head Extreme Elite 2023 chính hãng được sản xuất dựa trên nền tảng công nghệ của dòng Head Extreme cùng mức giá thành hợp lý, cây vợt này mang đến những trải nghiệm tuyệt vời, giúp người chơi cải thiện kỹ năng và nâng cao hiệu suất vượt trội.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 30,
          languagecode: "vi",
          name: "Vợt PickleBall Head Pack Flash chính hãng",
          description:
            "Vợt PickleBall Head Pack Flash bao gồm 2 cây vợt PickleBall Head Pack Flash và 2 quả bóng Pickleball, vô cùng tiện lợi cho những ai muốn tìm cho mình 1 set vợt đầy đủ phụ kiện mà tiết kiệm chi phí.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 1,
          languagecode: "en",
          name: "Yonex Nanoflare 700 Pro 2024 Badminton Racket",
          description:
            "The Yonex Nanoflare 700 Pro 2024 is an upgraded version of the Nanoflare 700 series, focusing on flexible gameplay, fast drive shots, and high-speed shuttle control with superior precision.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 2,
          languagecode: "en",
          name: "Yonex Arcsaber 0 Feel Badminton Racket",
          description:
            "The Yonex Arcsaber 0 Feel is an affordable racket from Yonex, featuring a balanced index and a super flexible shaft for power support, aimed at beginners who love an all-around playing style.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 3,
          languagecode: "en",
          name: "Yonex Astrox 88S Pro 2024 Badminton Racket",
          description:
            "The Yonex Astrox 88S Pro 2024 focuses on defensive drives and control. With a 298mm balance point and a stiffer, shorter shaft than usual, it provides agility in exchanges, especially for net play and high-speed drives.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 4,
          languagecode: "en",
          name: "Lining Axforce 10 Badminton Racket",
          description:
            "The Lining Axforce 10 is a mid-range racket with a balance point of 295 +-5mm, designed for all-around gameplay with a slight offensive edge. The medium-stiff shaft makes it easy for players to get used to and control.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 5,
          languagecode: "en",
          name: "Yonex Nanoflare Starbucks Badminton Racket",
          description:
            "A collaboration between Yonex and Starbucks. It features two versions: signature coffee green and soft pink, with meticulously crafted details. The racket comes pre-strung for convenience.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 6,
          languagecode: "en",
          name: "Yonex Velo 200 Badminton Shoes",
          description:
            "The Yonex Velo 200 is an affordable shoe line from Yonex, offering a variety of colors. It is particularly suitable for students and amateur players who enjoy badminton.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 7,
          languagecode: "en",
          name: "Yonex Power Cushion Comfort Z3 Women Badminton Shoes",
          description:
            "Premium badminton shoes for amateur and professional players seeking maximum comfort and speed. Features an asymmetrical upper design that reduces pressure and provides a wrap-around fit.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 8,
          languagecode: "en",
          name: "Kawasaki A3310 Badminton Shoes",
          description:
            "A mid-range shoe model designed specifically for badminton lovers, ensuring smoothness and increased movement speed on the court.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 9,
          languagecode: "en",
          name: "Lining AYAU005-1 Genuine Badminton Shoes",
          description:
            "Genuine Lining badminton shoes with a sporty design and high durability, suitable for professional players.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 10,
          languagecode: "en",
          name: "Lining AYTU025-3 Genuine Badminton Shoes",
          description:
            "Features a simple and casual color scheme. The upper is made of comfortable, soft material for a good foot feel. The anti-collision toe design helps reduce scratches and protects the toes.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 11,
          languagecode: "en",
          name: "Yonex RM2890 Badminton Shirt - Steel Gray",
          description:
            "Genuine Yonex badminton shirt, featuring lightweight stretch and breathable material, suitable for competition or training.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 12,
          languagecode: "en",
          name: "Yonex A531 Men Badminton Shirt - White Blue",
          description:
            "Men's Yonex badminton shirt with a youthful white and blue modern design, offering excellent sweat absorption.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 13,
          languagecode: "en",
          name: "Lining 9019 Badminton Skirt - White",
          description:
            "Made from high-quality, soft, and stretchy material for comfort. Equipped with a protective inner layer to help female players feel confident during movement.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 14,
          languagecode: "en",
          name: "Lining 9019 Badminton Skirt - Black",
          description:
            "High-quality, soft, and elastic material providing a smooth feel. Includes a built-in inner safety layer for confident movement on the court.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 15,
          languagecode: "en",
          name: "Victor 960 Badminton Shorts - White",
          description:
            "Victor 960 shorts featuring good elasticity, perfect sweat absorption, and high durability for long-term use.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 16,
          languagecode: "en",
          name: "Yonex 92431 TRM (GC) Badminton Bag",
          description:
            "Designed for both style and function with multiple compartments for rackets, shoes, clothing, and accessories to keep you organized and ready for the match.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 17,
          languagecode: "en",
          name: "Yonex BAG2329T02 Badminton Bag",
          description:
            "Features 2 spacious main compartments for all necessary equipment and an integrated shoe compartment to keep items separate and hygienic.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 18,
          languagecode: "en",
          name: "Kamito Cool KMTUI230260 Shoe Bag - Orange",
          description:
            "Artistic Kamito logo patterns combined with energetic colors, perfect for active and enthusiastic youth.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 19,
          languagecode: "en",
          name: "Yonex 83031 (GC) Badminton Bag",
          description:
            "A versatile, compact, and lightweight bag with large storage space. Available in 4 color versions including White/Navy, White/Green, White/Purple, and White/Turquoise.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 20,
          languagecode: "en",
          name: "Yonex BAG524B0712Z Badminton Backpack",
          description:
            "A stylish and convenient backpack made of durable Polyester fabric with dust and water resistance. Available in 4 different color versions.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 21,
          languagecode: "en",
          name: "Victor Doraemon NCS_DRM M Nylon Shuttlecock Tube - Blue",
          description:
            "Plastic shuttlecocks featuring a Doraemon themed box, a collaboration between Victor and the famous Japanese animation.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 22,
          languagecode: "en",
          name: "Hai Yen S70 Shuttlecock Tube",
          description:
            "High-quality shuttlecocks produced on 80% automated lines following BWF standards, ensuring consistent quality and performance.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 23,
          languagecode: "en",
          name: "88 Premium Shuttlecock Tube",
          description:
            "Premium shuttlecocks made from natural feathers, produced on 80% automated lines following international BWF standards.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 24,
          languagecode: "en",
          name: "Hai Anh Pro Shuttlecock Tube",
          description:
            "Tournament standard shuttlecocks with 16 natural feathers distributed evenly, processed and anchored in a fan-shaped pattern to create a stable flight path and reduced wobbling.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 25,
          languagecode: "en",
          name: "Yonex AS30 Shuttlecock Tube",
          description:
            "The official shuttlecock for top international tournaments. Precision-engineered and extensively tested to ensure 100% consistency across all shuttlecocks.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 26,
          languagecode: "en",
          name: "Yonex BG 9 Badminton String",
          description:
            "A great choice for all levels. High-strength multi-filament nylon provides power support, good shock absorption, and a sharp hitting sound.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 27,
          languagecode: "en",
          name: "Felet RigCore 61 Badminton String",
          description:
            "Designed with excellent repulsion power, high hitting sound, and high elasticity to provide optimal performance for players.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 28,
          languagecode: "en",
          name: "Lining L9 Badminton String",
          description:
            "Made from nylon polymer with a 0.75mm thickness. Highly durable and cost-effective, ideal for beginners or those seeking longevity.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 29,
          languagecode: "en",
          name: "Head Extreme Elite 2023 Pickleball Paddle",
          description:
            "Based on the Head Extreme technology line at an affordable price, this paddle helps players improve skills and performance significantly.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productid: 30,
          languagecode: "en",
          name: "Head Pack Flash Pickleball Set",
          description:
            "Includes 2 Head Pack Flash paddles and 2 Pickleballs, a convenient and cost-saving set for those starting with the sport.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("pro_translations", null, {});
  },
};
