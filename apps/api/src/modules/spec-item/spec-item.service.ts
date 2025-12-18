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
import { Model } from "sequelize-typescript";



@Injectable()
export class SpecItemService {
  constructor(
    @InjectModel(SpecItem)
    private specItemModel: typeof SpecItem
  ) { }


async findAll(
  limit: number = 5,
  page: number = 1,
  query?: string,
  orderBy?: string,
): Promise<{
  success: boolean;
  data: SpecItem[];
  totalPages: number;
  totalResults: number;
  currentPage: number;
  limit: number;
}> {
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
        orderClause.push(['phaseId', 'ASC']);
        break;
      case 'vendor':
        orderClause.push([{ model: Vendor, as: 'vendor' }, 'name', 'ASC']);
        break;
      case 'phase_desc':
        orderClause.push(['phaseId', 'DESC']);
        break;
      case 'vendor_desc':
        orderClause.push([{ model: Vendor, as: 'vendor' }, 'name', 'DESC']);
        break;
      default:
        throw new BadRequestException(
          `Invalid orderBy parameter: ${orderBy}. Use 'phase', 'vendor', 'phase_desc', or 'vendor_desc'`,
        );
    }
  } else {
    orderClause.push(['id', 'ASC']);
  }

  // Use findAndCountAll to get both data and total count
  const { rows, count } = await this.specItemModel.findAndCountAll({
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
    limit,
    offset: (page - 1) * limit,
    subQuery: false,
    distinct: true, // Important for accurate count with joins
  });

  const totalPages = Math.ceil(count / limit);

  return {
    success: true,
    data: rows,
    totalPages,
    totalResults: count,
    currentPage: page,
    limit,
  };
}

  async bulkUpdate(items: Array<{ id: number;[key: string]: any }>): Promise<{
    success: number;
    failed: number;
    errors: Array<{ id: number; error: string }>;
    updated: SpecItem[];
  }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ id: number; error: string }>,
      updated: [] as SpecItem[],
    };

    // Use Promise.all for parallel updates (faster)
    const updatePromises = items.map(async (item) => {
      try {
        const { id, ...updateData } = item;

        // Direct update without find first
        const [affectedCount] = await this.specItemModel.update(updateData, {
          where: { id },
        });

        if (affectedCount === 0) {
          results.failed++;
          results.errors.push({
            id,
            error: `SpecItem with ID ${id} not found`,
          });
          return null;
        }

        results.success++;
        return id;
      } catch (error) {
        results.failed++;
        results.errors.push({
          id: item.id,
          error: error.message || 'Unknown error',
        });
        return null;
      }
    });

    const updatedIds = (await Promise.all(updatePromises)).filter((id) => id !== null);

    // Fetch all updated items in one query
    if (updatedIds.length > 0) {
      results.updated = await this.specItemModel.findAll({
        where: { id: updatedIds },
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
      });
    }

    return results;
  }
}