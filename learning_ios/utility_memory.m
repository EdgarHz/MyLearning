//
//  utility_memory.m
//  PusherTester
//
//  Created by hzy on 2016/11/21.
//  Copyright © 2016年 duskash. All rights reserved.
//

#import "utility_memory.h"

@implementation utility_memory

@end


#include <mach/mach.h>

BOOL memoryInfo(vm_statistics_data_t *vmStats) {
    mach_msg_type_number_t infoCount = HOST_VM_INFO_COUNT;
    kern_return_t kernReturn = host_statistics(mach_host_self(), HOST_VM_INFO, (host_info_t)vmStats, &infoCount);
    
    return kernReturn == KERN_SUCCESS;
}

void logMemoryInfo() {
    vm_statistics_data_t vmStats;
    
    if (memoryInfo(&vmStats)) {
        printf("\n\nfree: %luM\nactive: %luM\ninactive: %luM\nwire: %luM\nzero fill: %luM\nreactivations: %luM\npageins: %luK\npageouts: %luK\nfaults: %u\ncow_faults: %u\nlookups: %u\nhits: %u\n\n",
               vmStats.free_count * vm_page_size /1014/1024,
               vmStats.active_count * vm_page_size/1014/1024,
               vmStats.inactive_count * vm_page_size/1014/1024,
               vmStats.wire_count * vm_page_size/1014/1024,
               vmStats.zero_fill_count * vm_page_size/1014/1024,
               vmStats.reactivations * vm_page_size/1014/1024,
               vmStats.pageins * vm_page_size/1024,
               vmStats.pageouts * vm_page_size/1024,
               vmStats.faults,
               vmStats.cow_faults,
               vmStats.lookups,
               vmStats.hits
               );
    }
}
