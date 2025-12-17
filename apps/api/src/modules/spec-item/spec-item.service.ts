import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SpecItem } from "./spec-item.model";
import { Spec } from "../spec/spec.model";
import { Category } from "../category/category.model";
import { Phase } from "../phase/phase.model";
import { Address } from "../address/address.model";
import { Vendor } from "../vendor/vendor.model";
import { Location } from "../location/location.model";
import { Op } from "sequelize";



@Injectable()
export class SpecItemService {
  constructor(
    @InjectModel(SpecItem)
    private specItemModel: typeof SpecItem
  ) { }


  async findAll(query?: string, orderBy?: string): Promise<SpecItem[]> {
    // Build where clause for search
    const whereClause: any = {};

    if (query) {
      whereClause[Op.or] = [
        { id: isNaN(Number(query)) ? null : Number(query) },
        { description: { [Op.iLike]: `%${query}%` } },
        { "$spec.title$": { [Op.iLike]: `%${query}%` } },
      ];
    }

    // Build order clause
    const orderClause: any[] = [];

    if (orderBy) {
      switch (orderBy.toLowerCase()) {
        case 'phase':
          // Order by phase ID (ascending)
          orderClause.push(['phaseId', 'ASC']);
          break;
        case 'vendor':
          // Order by vendor name (ascending)
          orderClause.push([{ model: Vendor, as: 'vendor' }, 'name', 'ASC']);
          break;
        case 'phase_desc':
          // Order by phase ID (descending)
          orderClause.push(['phaseId', 'DESC']);
          break;
        case 'vendor_desc':
          // Order by vendor name (descending)
          orderClause.push([{ model: Vendor, as: 'vendor' }, 'name', 'DESC']);
          break;
        default:
          throw new BadRequestException(`Invalid orderBy parameter: ${orderBy}. Use 'phase', 'vendor', 'phase_desc', or 'vendor_desc'`);
      }
    } else {
      // Default ordering by ID
      orderClause.push(['id', 'ASC']);
    }

    return this.specItemModel.findAll({
      where: whereClause,
      include: [
        { model: Spec, attributes: ['id', 'title'] },
        { model: Location, attributes: ['id', 'name'] },
        { model: Category, attributes: ['id', 'name'] },
        { model: Phase, attributes: ['id', 'name'] },
        { model: Address, as: 'shipsToAddress', attributes: ['id', 'name', 'address'] },
        {
          model: Vendor,
          attributes: ['id', 'name'],
          include: [{ model: Address, attributes: ['id', 'name', 'address'] }],
        },
      ],
      order: orderClause,
      subQuery: false, // Important for ordering by related tables
    });
  }

}