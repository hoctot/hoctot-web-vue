<template>
  <div class="container mx-auto about">
    <div>
      <img onmousedown="return false" class="mx-auto about-img bg-white rounded" src="/img/undraw/tour.png" width="300" />
    </div>

    <div class="cover-desc">
      <p>
        <span class="big-text">Giáo dục</span>
        (tiếng Anh: education) theo nghĩa chung là hình thức học tập theo đó kiến thức, kỹ năng, và thói quen của một nhóm người được trao truyền từ thế hệ này sang thế hệ khác thông qua giảng dạy, đào tạo, hay nghiên cứu. Giáo dục thường diễn ra dưới sự hướng dẫn của người khác, nhưng cũng có thể thông qua tự học. Bất cứ trải nghiệm nào có ảnh hưởng đáng kể lên cách mà người ta suy nghĩ, cảm nhận, hay hành động đều có thể được xem là có tính giáo dục. Giáo dục thường được chia thành các giai đoạn như giáo dục tuổi ấu thơ, giáo dục tiểu học, giáo dục trung học, và giáo dục đại học.
        Về mặt từ nguyên, "education" trong tiếng Anh có gốc La-tinh ēducātiō ("nuôi dưỡng, nuôi dạy") gồm ēdūcō ("tôi giáo dục, tôi đào tạo"), liên quan đến từ đồng âm ēdūcō ("tôi tiến tới, tôi lấy ra; tôi đứng dậy"). Trong tiếng Việt, "giáo" có nghĩa là dạy, "dục" có nghĩa là nuôi (không dùng một mình); "giáo dục" là "dạy dỗ gây nuôi đủ cả trí-dục, đức-dục, thể-dục."
        Tại Việt Nam, một định nghĩa khác về giáo dục được Giáo sư Hồ Ngọc Đại đưa ra như sau: Giáo dục là một quá trình mà trong đó kiến thức, kỹ năng và kinh nghiệm của một người hay một nhóm người này được truyền tải một cách tự nhiên mà không hề áp đặt sang một người hay một nhóm người khác thông qua giảng dạy, đào tạo hay nghiên cứu để từ đó tìm ra, khuyến khích, định hướng và hỗ trợ mỗi cá nhân phát huy tối đa được ưu điểm và sở thích của bản thân khiến họ trở thành chính mình, qua đó đóng góp được tối đa năng lực cho xã hội trong khi vẫn thỏa mãn được quan điểm, sở thích và thế mạnh của bản thân.
        Quyền giáo dục được nhiều chính phủ thừa nhận. Ở cấp độ toàn cầu, Điều 13 của Công ước Quốc tế về các Quyền Kinh tế, Xã hội và Văn hóa (1966) của Liên Hiệp Quốc công nhận quyền giáo dục của tất cả mọi người. Mặc dù ở hầu hết các nước, giáo dục có tính chất bắt buộc cho đến một độ tuổi nhất định, việc đến trường thường không bắt buộc; một số ít các bậc cha mẹ chọn cho con cái học ở nhà, học trực tuyến, hay những hình thức tương tự.
      </p>
      <br>
      <p># Chân thành cảm ơn bạn đã dành thời gian trải nghiệm.</p>
      <br />
      <p>
        &copy; {{new Date().getFullYear()}} -
        <a class="text-blue-500" href="https://github.com/001123" target="_blank">Bùi Khương Duy</a> -
        <a class="text-blue-500" href="https://github.com/hoctot" target="_blank">Dự án Học Tốt</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style lang="scss" scoped>
.about {
  position: relative;

  .cover-img {
    position: absolute;
    opacity: 0.15;
  }
  .cover-desc {
    position: absolute;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    text-align: justify;
    font-family: monospace;
  }
  .big-text {
    font-size: 2rem;
  }
}
.about-img {
  min-height: 14rem;
}
</style>
