// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { TrackPlayCountEntity } from "src/entities/trackplaycount.entity";
// import { PlaycountDto } from "src/spotify/dto";
// import { Repository } from "typeorm";

// @Injectable()
// export class DatabaseService {

//     constructor(
//         @InjectRepository(TrackPlayCountEntity)
//         private trackPlayCountRepository: Repository<TrackPlayCountEntity>

//         //private readonly httpService: HttpService
//     ) {}

//     addPlaycountData(tracksData: PlaycountDto[]) {
        
//         let toReturn: TrackPlayCountEntity[] = []

//         console.log(tracksData)

//         tracksData.forEach(async x => {
//             const trackPlayCountEntity = new TrackPlayCountEntity()
//             trackPlayCountEntity.uri = x.uri
//             trackPlayCountEntity.playcount = x.playcount
//             trackPlayCountEntity.date = x.date.toString()
//             toReturn.push(await this.trackPlayCountRepository.save(trackPlayCountEntity))
//         })
//         return toReturn
//     }
// }