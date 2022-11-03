import { PixelRatio } from "react-native";

//https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_rate&facet=host_verifications&facet=city&facet=property_type&facet=cancellation_policy&facet=features
const data = {
  datasetid: "airbnb-listings",
  recordid: "1a2022a40a47773b00fbb1c8c889cddbb6b651e9",
  fields: {
    geolocation: [52.35992696894107, 4.862859671199358],
    host_verifications: "email,phone,facebook,reviews",
    review_scores_communication: 9,
    jurisdiction_names: "Amsterdam",
    availability_90: 0,
    scrape_id: "20170402075052",
    city: "Amsterdam",
    number_of_reviews: 3,
    bathrooms: 1.0,
    description:
      "Nice and clean private bedroom near the city center, 15 minutes by bike to Central station, Leidseplein  Several shops, bars, restaurants and transports five minutes from my place.  Balcony, bath, towels, shampoo, shower, wifi, music lounge,",
    review_scores_location: 9,
    accommodates: 1,
    summary:
      "Nice and clean private bedroom near the city center, 15 minutes by bike to Central station, Leidseplein  Several shops, bars, restaurants and transports five minutes from my place.  Balcony, bath, towels, shampoo, shower, wifi, music lounge,",
    property_type: "Apartment",
    bedrooms: 1,
    street: "Amsterdam, Noord-Holland 1054, Netherlands",
    access:
      "Acces to shared use of the bathroom facilities  badroom, living room, and kitchen.",
    cancellation_policy: "flexible",
    xl_picture_url:
      "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=x_large",
    id: "6017649",
    price: 50,
    neighbourhood_cleansed: "De Baarsjes - Oud-West",
    reviews_per_month: 0.13,
    transit:
      "Directly train connection to Central Station and  to the city center and tourist attractions.",
    review_scores_rating: 90,
    smart_location: "Amsterdam, Netherlands",
    host_location: "Amsterdam, North Holland, Netherlands",
    beds: 1,
    features: "Host Has Profile Pic",
    space:
      "I offer a cuzy, private room in a nice apartment in Amsterdam, access to the bathroom, kichen and wifi. Directly to the public transport. Vondelpark and Supermarket within a minute walking distance.",
    host_id: "1195000",
    last_scraped: "2017-04-02",
    latitude: "52.35992696894107",
    country_code: "NL",
    country: "Netherlands",
    market: "Amsterdam",
    review_scores_cleanliness: 9,
    state: "Noord-Holland",
    host_since: "2011-09-22",
    availability_60: 0,
    minimum_nights: 1,
    medium_url:
      "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=medium",
    host_url: "https://www.airbnb.com/users/show/1195000",
    thumbnail_url:
      "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=small",
    first_review: "2015-05-10",
    name: "Nice room at Vondelpark",
    neighborhood_overview: "Really nice and quiet nighborhood!",
    calculated_host_listings_count: 1,
    calendar_last_scraped: "2017-04-02",
    host_picture_url:
      "https://a0.muscache.com/im/users/1195000/profile_pic/1316706329/original.jpg?aki_policy=profile_x_medium",
    host_total_listings_count: 1,
    picture_url: {
      id: "1333549eac1ff1f91b4443e0dc910c3a",
      mimetype: "image/jpeg",
      height: 480,
      width: 480,
      filename: "415cd752_original.jpg",
      thumbnail: true,
      format: "JPEG",
      color_summary: [
        "rgba(101, 94, 87, 1.00)",
        "rgba(88, 86, 76, 1.00)",
        "rgba(54, 54, 64, 1.00)",
      ],
    },
    extra_people: 0,
    room_type: "Private room",
    amenities: "Internet,Wireless Internet,Kitchen,Heating,Washer,Essentials",
    listing_url: "https://www.airbnb.com/rooms/6017649",
    review_scores_accuracy: 10,
    calendar_updated: "22 months ago",
    host_thumbnail_url:
      "https://a0.muscache.com/im/users/1195000/profile_pic/1316706329/original.jpg?aki_policy=profile_small",
    host_listings_count: 1,
    host_name: "Linda",
    review_scores_checkin: 10,
    availability_365: 0,
    last_review: "2015-06-08",
    bed_type: "Real Bed",
    review_scores_value: 9,
    zipcode: "1054",
    longitude: "4.862859671199358",
    maximum_nights: 1125,
    availability_30: 0,
    experiences_offered: "none",
    guests_included: 1,
  },
  geometry: {
    type: "Point",
    coordinates: [4.862859671199358, 52.35992696894107],
  },
  record_timestamp: "2020-07-31T22:00:07.811Z",
};

export const gather_rooms = [
  {
    id: 1,
    subject: "한독커플 있으신가요",
    content:
      "서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!서울사시는 한독커플 있으신가요! 저희 ㅐ만나요!!",
    link_url: "httpsrij:fqreifoieqrf.com",
    address: "홍대",
    user_limit: 5,
    start_date: "2022-01-01 00:00:00",
    end_date: "2022-01-02 00:00:00",
    start_time: "2022-01-01 00:00:00",
    end_time: "2022-01-02 00:00:00",
    creator_id: "게더",

    gather_room_category_id: 1, //카테고리별 id 정하기
    // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
  },

  {
    id: 2,
    subject: "중국어 배우고 싶어요!",
    content:
      "내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???내년에 중국으로 교환학생가서 중국어를 배우고 친구도 사귀고 싶어요! 한국어랑 언어교환하실분 있나요???",
    link_url: "httpsrij:fqreifoieqrf.com",
    address: "강남",
    user_limit: 1,
    male_ratio: 0,
    start_date: "2022-01-01 00:00:00",
    end_date: "2022-01-02 00:00:00",
    start_time: "2022-01-01 00:00:00",
    end_time: "2022-01-02 00:00:00",
    creator_id: "타운",

    gather_room_category_id: 3, //카테고리별 id 정하기
    // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
  },
  {
    id: 3,
    subject: "ANyone up for a drink?",
    content:
      "M r. and Mrs. Dursley, of number four, Privet Drive, wer proud to say that they were perfectly normal, thank you verymuch.  ey were the last people you’d expect to be involved in anything strange or mysterious, because they just didn’t hold with such nonsense. Mr. Dursley was the director of a fi rm called Grunnings, whichmade drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as sh her time craning over  garden fences, spying on the neighbors.sleys had a small  son called Dudley and in their opinion there was no fi ner boy anywhere.  e Dursleys had everything th",
    link_url: "httpsrij:fqreifoieqrf.com",
    address: "신촌",
    user_limit: 1,
    male_ratio: 0,
    start_date: "2022-01-01 00:00:00",
    end_date: "2022-01-02 00:00:00",
    start_time: "2022-01-01 00:00:00",
    end_time: "2022-01-02 00:00:00",
    creator_id: "와아ㅏ",
    gather_room_category_id: 4, //카테고리별 id 정하기
    // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
  },
  {
    id: 4,
    subject: "change in the geometry o",
    content:
      "Please Edit the Question to specify the error you receive. Sample input data is also necessary, and making it a reproducible example by providing the full CREATE TABLE, CREATE FUNCTION, and CREATE TRIGGER syntax would increase the likelihood of generating a response",
    link_url: "httpsrij:fqreifoieqrf.com",
    address: "건대",
    user_limit: 1,
    male_ratio: 0,
    start_date: "2022-01-01 00:00:00",
    end_date: "2022-01-02 00:00:00",
    start_time: "2022-01-01 00:00:00",
    end_time: "2022-01-02 00:00:00",
    creator_id: "와아ㅏ",
    gather_room_category_id: 2, //카테고리별 id 정하기
    // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
  },
  {
    id: 5,
    subject: "I'm using PostGIS and I would like to use trigger",
    content:
      "As of PostgreSQL 12 you can use the GENERATED column definitions for an auto-updated read-only field (with some restrictions)     ALTER TABLE table      ADD COLUMN area_calc FLOAT GENERATED ALWAYS AS ( ST_Area(geom)/10000 ) STORED    Values generated from simple intra-row calculations which will never participate in filter conditions or joins are a good fit for dynamic (and lazy) evaluation, e.g. this approach or as part of a View.",
    link_url: "httpsrij:fqreifoieqrf.com",
    address: "서울숲",
    user_limit: 1,
    male_ratio: 0,
    start_date: "2022-01-01 00:00:00",
    end_date: "2022-01-02 00:00:00",
    start_time: "2022-01-01 00:00:00",
    end_time: "2022-01-02 00:00:00",
    creator_id: "와아ㅏ",
    gather_room_category_id: 1, //카테고리별 id 정하기
    // img: "https://t4.ftcdn.net/jpg/02/77/68/51/360_F_277685185_UAYxm224UPelni1rxsuAUZQbfhly0RpL.jpg",
  },
];
